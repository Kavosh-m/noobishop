// import { combineReducers } from "redux";
// import {user} from './user';
// import { food } from "./food";
// import { shoppingCart } from "./shoppingCart";
import { combineReducers } from "redux";
import food from "./food";

const rootReducers = combineReducers({
  //   userState: user,
  foodState: food,
  //   shoppingCartState: shoppingCart,
});

export default rootReducers;
