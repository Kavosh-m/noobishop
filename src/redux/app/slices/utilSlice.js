import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: false,
};

export const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebar = true;
    },
    closeSidebar: (state) => {
      state.sidebar = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openSidebar, closeSidebar } = utilSlice.actions;

export default utilSlice.reducer;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Thunk actions define here:
