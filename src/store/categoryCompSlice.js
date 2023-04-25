import { createSlice } from '@reduxjs/toolkit';

const categoryCompSlice = createSlice({
    name: 'categoryCompStore',
    initialState: {
        currentCategory: [],
    },
    reducers: {
        getAllCategoriesStore: (state, action) => {
            state.currentCategory = action.payload;
        },
        deleteProductByCategoryStore: (state, action) => {
            state.currentCategory = action.payload;
        },
    },
});

export const { getAllCategoriesStore, deleteProductByCategoryStore} = categoryCompSlice.actions;

export default categoryCompSlice.reducer;