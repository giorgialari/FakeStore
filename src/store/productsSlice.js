import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    currentProducts: [],
  },
  reducers: {
    getAllProductsStore: (state, action) => {
      state.currentProducts = action.payload;
    },
    getProductByIdStore: (state, action) => {
      state.currentProducts = action.payload;
    },
    addProductStore: (state, action) => {
      state.currentProducts = action.payload;
    },
    updateProductStore: (state, action) => {
      state.currentProducts = action.payload;
    },
    deleteProductStore: (state, action) => {
      state.currentProducts = action.payload;
    },
  },
});

export const {
  getAllProductsStore,
  getProductByIdStore,
  addProductStore,
  updateProductStore,
  deleteProductStore,
} = productsSlice.actions;

export default productsSlice.reducer;
