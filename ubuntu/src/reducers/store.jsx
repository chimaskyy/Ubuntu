import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartSlice,
    products: productSlice,
    orders: orderSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// store.subscribe(() => {
//     localStorage.setItem("cart", JSON.stringify(store.getState().cart));
// });

export default store;
