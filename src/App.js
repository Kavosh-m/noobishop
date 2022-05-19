import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import rootReducers from "./redux/reducers";
// import thunk from "redux-thunk"; //in order to using dispatch in actions
// import thunkMiddleware from "redux-thunk";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchBurgers,
  fetchPizzas,
  fetchPastas,
  fetchDrinks,
} from "./redux/app/slices/foodSlice";

import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
import RegisterRoute from "./routes/RegisterRoute";
import AboutRoute from "./routes/AboutRoute";
import ShopRoute from "./routes/ShopRoute";
import ProductDetailsRoute from "./routes/ProductDetailsRoute";
import CartRoute from "./routes/CartRoute";
import Contact from "./routes/Contact";
import WishRoute from "./routes/WishRoute";
import NotFoundRoute from "./routes/NotFoundRoute";
import MyAccountRoute from "./routes/MyAccountRoute";

import LoadingIndicator from "./components/LoadingIndicator";
import SearchRoute from "./routes/SearchRoute";

// const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default function App() {
  const dispatch = useDispatch();

  const burgers = useSelector((state) => state.food.burger);
  const pizzas = useSelector((state) => state.food.pizza);
  const pastas = useSelector((state) => state.food.pasta);
  const drinks = useSelector((state) => state.food.drink);

  const [isLoggedIn, setIsLoggedIn] = useState(null);

  // const userExist = useState(auth.currentUser)[0];

  useEffect(() => {
    dispatch(fetchBurgers());
    dispatch(fetchPizzas());
    dispatch(fetchPastas());
    dispatch(fetchDrinks());
  }, []);

  // console.log(isLoggedIn);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let providerid = user.providerData[0].providerId;
        // console.log(user.providerData[0].providerId);
        //check if user exist in database
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("user exist in database");
          setIsLoggedIn(true);
        } else {
          // console.log("new user");
          if (providerid !== "phone") {
            await setDoc(docRef, {
              name: user.displayName,
              email: user.email,
              phonenumber: "",
            });
          }
          setIsLoggedIn(true);
        }
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth.currentUser]);

  if (isLoggedIn === null || !burgers || !pizzas || !pastas || !drinks) {
    return (
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShopRoute />} />
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/register" element={<RegisterRoute />} />
          </>
        )}
        <Route path="/about" element={<AboutRoute />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetailsRoute />} />
        <Route path="/search/:q" element={<SearchRoute />} />
        <Route path="/cart" element={<CartRoute />} />
        <Route path="/wish" element={<WishRoute />} />
        {isLoggedIn && <Route path="/profile" element={<MyAccountRoute />} />}
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
