// import {
//   GET_BURGER,
//   // GET_FOOD_ITEM_COMMENTS,
//   // GET_FOOD_TABLE,
//   // GET_PIZZA,
//   // GET_PASTA,
//   // GET_DRINK,
// } from "../constants";
import { GET_ALL_FOODS, GET_BURGER } from "../constants";

const initialState = {
  burger: null,
  pizza: null,
  pasta: null,
  drink: null,
  comments: null,
};

const food = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FOODS:
      // let data = action.payload;
      // console.log("payload ===> ", data);
      return {
        ...state,
        burger: action.payload.burger,
        pizza: action.payload.pizza,
        drink: action.payload.drink,
        pasta: action.payload.pasta,
      };

    case GET_BURGER:
      console.log("we are in reducer. action.burger ===> ", action.payload);
      return {
        ...state,
        burger: action.payload,
      };

    // case GET_PIZZA:
    //   return {
    //     ...state,
    //     pizza: action.pizza,
    //   };

    // case GET_PASTA:
    //   return {
    //     ...state,
    //     pasta: action.pasta,
    //   };

    // case GET_DRINK:
    //   return {
    //     ...state,
    //     drink: action.drink,
    //   };

    // case GET_FOOD_ITEM_COMMENTS:
    //   return {
    //     ...state,
    //     comments: action.comments,
    //   };

    default:
      return state;
  }
};

export default food;
