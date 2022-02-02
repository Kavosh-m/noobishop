import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Provider } from "react-redux";
// import { createStore, applyMiddleware } from "redux";
// import rootReducers from "./redux/reducers";
// import thunk from "redux-thunk"; //in order to using dispatch in actions
// import thunkMiddleware from "redux-thunk";

import { useDispatch } from "react-redux";
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
import WishRoute from "./routes/WishRoute";

import LoadingIndicator from "./components/LoadingIndicator";

// const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default function App() {
  const dispatch = useDispatch();

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const userExist = useState(auth.currentUser)[0];

  useEffect(() => {
    dispatch(fetchBurgers());
    dispatch(fetchPizzas());
    dispatch(fetchPastas());
    dispatch(fetchDrinks());
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [userExist]);

  if (isLoggedIn === null) {
    return (
      <div className="relative flex h-screen w-screen flex-col items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        {!isLoggedIn && (
          <>
            <Route path="/login" element={<LoginRoute />} />
            <Route path="/register" element={<RegisterRoute />} />
          </>
        )}
        <Route path="/about" element={<AboutRoute />} />
        <Route path="/shop" element={<ShopRoute />} />
        <Route path="/products/:id" element={<ProductDetailsRoute />} />
        <Route path="/cart" element={<CartRoute />} />
        <Route path="/wish" element={<WishRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
