import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import orderSlice from "./orderSlice";
import userReducer from "./userSlice";
const store = configureStore({
  reducer: {
    user: authReducer,
    cart: cartSlice,
    products: productSlice,
    orders: orderSlice,
    users: userReducer,
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
