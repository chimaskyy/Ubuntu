import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const saveCart = createAsyncThunk(
  "cart/saveCart",
  async ({ userId, cart }, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "carts", userId); //associate cart to user

      await setDoc(cartRef, { cart }, { merge: true });
      return cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "carts", userId);
      const cartSnap = await getDoc(cartRef);
      if (cartSnap.exists()) {
        return cartSnap.data().cart || [];
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async ({ userId, cart }, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "carts", userId);
      await updateDoc(cartRef, { cart });
      return cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateItemInCart = createAsyncThunk(
  "cart/updateItem",
  async ({ userId, item }, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "carts", userId);
      await updateDoc(cartRef, { [`cart.${item.id}`]: item });
      return item;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFromCart = createAsyncThunk(
  "cart/deleteCart",
  async (userId, { rejectWithValue }) => {
    try {
      const cartRef = doc(db, "carts", userId);
      await deleteDoc(cartRef);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loaded: false,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(saveCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFromCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
  reducers: {
    addToCart: (state, action) => {
      const itemExist = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemExist) {
        itemExist.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalQuantity++;
      if (action.payload?.price) {
        state.totalPrice += parseFloat(action.payload.price);
      } else {
        console.warn("Invalid product data:", action.payload);
      }
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
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
  },
});

export const addToCartAndSave = (userId, product) => (dispatch, getState) => {
  dispatch(addToCart(product));
  const { items } = getState().cart; // Extract items from cart state
  dispatch(saveCart({ userId, cart: items })); // Save items to Firebase
};

export const removeFromCartAndSave =
  (userId, productId) => (dispatch, getState) => {
    dispatch(removeFromCart({ id: productId })); // Update Redux state first

    const { items } = getState().cart; // Get the updated cart items from the Redux state
    dispatch(saveCart({ userId, cart: items })) // Save the updated cart to Firestore
      .then(() => {
        toast.success("Item removed from cart successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to save updated cart: ${error}`);
        console.error("Error saving cart to Firestore:", error);
      });
  };

  export const incrementItemAndSave = (userId, itemId) => (dispatch, getState) => {
    dispatch(incrementItem({ id: itemId })); // Update Redux state first
    const { items } = getState().cart; // Get the updated cart items from the Redux state
    dispatch(saveCart({ userId, cart: items })) // Save the updated cart to Firestore
      .then(() => {
        toast.success("Item quantity updated successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to save updated cart: ${error}`);
        console.error("Error saving cart to Firestore:", error);
      });
  }

    export const decrementItemAndSave = (userId, itemId) => (dispatch, getState) => {
        dispatch(decrementItem({ id: itemId })); // Update Redux state first
        const { items } = getState().cart; // Get the updated cart items from the Redux state
        dispatch(saveCart({ userId, cart: items })) // Save the updated cart to Firestore
        .then(() => {
            toast.success("Item quantity updated successfully!");
        })
        .catch((error) => {
            toast.error(`Failed to save updated cart: ${error}`);
            console.error("Error saving cart to Firestore:", error);
        });
    }

    export const clearCartAndSave = (userId) => (dispatch) => {
        dispatch(clearCart()); // Update Redux state first
        dispatch(deleteFromCart(userId)) // Delete the cart from Firestore
        .then(() => {
            toast.success("Cart cleared successfully!");
        })
        .catch((error) => {
            toast.error(`Failed to clear cart: ${error}`);
            console.error("Error deleting cart from Firestore:", error);
        });
    }

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementItem,
  decrementItem,
} = cartSlice.actions;
export default cartSlice.reducer;
