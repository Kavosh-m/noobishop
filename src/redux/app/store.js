import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./slices/foodSlice";
import cartReducer from "./slices/cartSlice";
import wishReducer from "./slices/wishSlice";
import utilReducer from "./slices/utilSlice";

export const store = configureStore({
  reducer: {
    food: foodReducer,
    cart: cartReducer,
    wish: wishReducer,
    util: utilReducer,
  },
});
