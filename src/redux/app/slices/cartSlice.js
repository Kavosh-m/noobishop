import { createSlice } from "@reduxjs/toolkit";
// import { db } from "../../../firebase";
// import { collection, getDocs } from "firebase/firestore";

const initialState = {
  ordered: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveOrders: (state, action) => {
      state.ordered.push(action.payload);
    },
    removeItem: (state, action) => {
      let id = action.payload.id;
      let temp = state.ordered.filter((item) => item.id === id);
      let indexOfInterest = state.ordered.indexOf(temp[0]);

      state.ordered.splice(indexOfInterest, 1);
    },
    changeNumberOfItem: (state, action) => {
      let id = action.payload.id;
      //   let n = action.payload.count;
      let op = action.payload.operation;

      let temp = state.ordered.filter((item) => item.id === id);
      let indexOfInterest = state.ordered.indexOf(temp[0]);
      if (op === "addition") {
        state.ordered[indexOfInterest].count += 1;
      } else if (
        op === "subtraction" &&
        state.ordered[indexOfInterest].count > 1
      ) {
        state.ordered[indexOfInterest].count -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveOrders, changeNumberOfItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Thunk actions define here:
