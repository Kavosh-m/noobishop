import React, { useState, useEffect } from "react";
// import { app } from "./firebase";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducers from "./redux/reducers";
// import thunk from "redux-thunk"; //in order to using dispatch in actions
import thunkMiddleware from "redux-thunk";

import HomeRoute from "./routes/HomeRoute";
import LoginRoute from "./routes/LoginRoute";
import RegisterRoute from "./routes/RegisterRoute";
import AboutRoute from "./routes/AboutRoute";
import ShopRoute from "./routes/ShopRoute";
import ProductDetailsRoute from "./routes/ProductDetailsRoute";

import LoadingIndicator from "./components/LoadingIndicator";

export const store = createStore(
  rootReducers,
  applyMiddleware(thunkMiddleware)
);
// console.log("before ===> ", store.getState());

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const userExist = useState(auth.currentUser)[0];
  // const auth = getAuth();

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
      <div className="flex flex-col relative items-center justify-center w-screen h-screen">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <Provider store={store}>
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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
