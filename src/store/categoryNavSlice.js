import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "categoryNavStore",
  initialState: {
    currentCategory: [],
  },
  reducers: {
    getAllCategoriesStore: (state, action) => {
      state.currentCategory = action.payload;
    },
  },
});

export const { getAllCategoriesStore } = categorySlice.actions;

export default categorySlice.reducer;
