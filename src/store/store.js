import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice"; // importa il reducer
import categoryNavReducer from "./categoryNavSlice"; // importa il reducer
import categoryCompReducer from "./categoryCompSlice"; // importa il reducer
import ordersReducer from "./ordersSlice";

const store = configureStore({
  reducer: {
    products: productsReducer, // assegna il reducer allo store
    categoryNavStore: categoryNavReducer, // assegna il reducer allo store
    categoryCompStore: categoryCompReducer, // assegna il reducer allo store
    ordersStore: ordersReducer, // assegna il reducer allo store
  },
});

export default store;
