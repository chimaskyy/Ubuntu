import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name: "cart",
    initialState: JSON.parse(localStorage.getItem("cart")) || {
        items: [],
        totalQuantity: 0,
    },

    reducers: {
        addToCart: (state, action) => {
            const itemExist = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (itemExist) {
                itemExist.quantity += action.payload.quantity || 1;
            } else {
                state.items.push({...action.payload, quantity: 1 });
            }
            state.totalQuantity++;
        },

        removeFromCart: (state, action) => {
            const itemIndex = state.items.findIndex(
                (item)=> item.id === action.payload.id
            );
            if(itemIndex !== -1) {
                state.totalQuantity -= state.items[itemIndex].quantity;
                state.items.splice(itemIndex, 1)
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0
        }, 

        incrementItem: (state, action) => {
            const itemExist = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (itemExist) {
                itemExist.quantity++;
                state.totalQuantity++;
            }
        },

        decrementItem: (state, action) => {
            const itemExist = state.items.find(
                (item) => item.id === action.payload.id
            );
            if (itemExist) {
                itemExist.quantity--;
                state.totalQuantity--;
            }
        },
    }
})

export const {addToCart, removeFromCart, clearCart, incrementItem, decrementItem} = cartSlice.actions;
export default cartSlice.reducer;