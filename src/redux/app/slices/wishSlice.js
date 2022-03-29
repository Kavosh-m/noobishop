import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
  wishlistItemsID: [],
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    saveToWishlist: (state, action) => {
      let repetetive = state.wishlist?.filter(
        (order) => order.id === action.payload.id
      );
      if (repetetive?.length > 0) {
        let index = state.wishlist.indexOf(repetetive[0]);
        state.wishlist.splice(index, 1);
      }

      //   console.log(action.payload);
      state.wishlist.push(action.payload);
      if (!state.wishlistItemsID.includes(action.payload.id)) {
        state.wishlistItemsID.push(action.payload.id);
        // console.log(state.wishlistItemsID);
      }
    },
    isInWishlist: (state, action) => {
      let temp = state.wishlist?.filter((order) => order.id === action.payload);
      if (temp?.length > 0) {
        return true;
      }
      return false;
    },
    removeItemFromWishlist: (state, action) => {
      let id = action.payload.id;
      let temp = state.wishlist.filter((item) => item.id === id);
      let indexOfInterest = state.wishlist.indexOf(temp[0]);

      state.wishlist.splice(indexOfInterest, 1);
      state.wishlistItemsID.splice(
        state.wishlistItemsID.indexOf(action.payload.id),
        1
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveToWishlist, removeItemFromWishlist, isInWishlist } =
  wishSlice.actions;

export default wishSlice.reducer;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Thunk actions define here:
