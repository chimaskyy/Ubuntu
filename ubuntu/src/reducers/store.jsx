import {configureStore} from '@reduxjs/toolkit';    
import userReducer from './userSlice';
import cartSlice from "./cartSlice"

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartSlice,
    },
});

store.subscribe(() => {
    localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;