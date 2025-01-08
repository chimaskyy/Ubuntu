import {configureStore} from '@reduxjs/toolkit';    
import userReducer from './userSlice';
import cartSlice from "./cartSlice"
import productSlice from './productSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartSlice,
        products: productSlice,
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// store.subscribe(() => {
//     localStorage.setItem("cart", JSON.stringify(store.getState().cart));
// });

export default store;