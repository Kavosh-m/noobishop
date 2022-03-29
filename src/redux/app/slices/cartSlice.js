import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordered: [],
  totalPrice: 0,
  cartItemsID: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    saveOrders: (state, action) => {
      let repetetive = state.ordered.filter(
        (order) => order.id === action.payload.id
      );
      if (repetetive.length > 0) {
        let index = state.ordered.indexOf(repetetive[0]);
        state.ordered.splice(index, 1);
      }

      state.ordered.push(action.payload);
      state.totalPrice += action.payload.price * action.payload.count;

      if (!state.cartItemsID.includes(action.payload.id)) {
        state.cartItemsID.push(action.payload.id);
        // console.log(state.cartItemsID);
      }
    },
    removeItem: (state, action) => {
      let id = action.payload.id;
      let temp = state.ordered.filter((item) => item.id === id);
      let indexOfInterest = state.ordered.indexOf(temp[0]);

      state.ordered.splice(indexOfInterest, 1);
      state.cartItemsID.splice(state.cartItemsID.indexOf(action.payload.id), 1);
    },
    changeNumberOfItem: (state, action) => {
      let id = action.payload.id;
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
