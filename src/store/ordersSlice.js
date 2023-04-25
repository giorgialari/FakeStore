import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'ordersStore',
    initialState: {
        currentOrders: [],
        currentOrderToEdit: {},
        currentOrderToDelete: {},
    },
    reducers: {
        getAllOrdersStore: (state, action) => {
            state.currentOrders = action.payload;
        },
        updateOrderStore: (state, action) => {
            state.currentOrderToEdit = action.payload;
        },
        deleteOrderStore: (state, action) => {
            state.currentOrderToDelete = action.payload;
        },
    },
});

export const { getAllOrdersStore, updateOrderStore, deleteOrderStore} = ordersSlice.actions;

export default ordersSlice.reducer;