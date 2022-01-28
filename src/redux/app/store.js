import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./slices/foodSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    food: foodReducer,
    cart: cartReducer,
  },
});
