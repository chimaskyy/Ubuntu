import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

//save cart to local storage
const saveToLocalStorage =(cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//fetch cart from local storage
const fetchFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  try {
    // Parse and return the cart, ensuring it's always an array
    const parsedCart = JSON.parse(cart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch (e) {
    // In case the JSON is corrupted or invalid, return an empty array
    return [];
  }
};



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

      if (!userId) {
        throw new Error("User ID is required to fetch the cart.");
      }
      
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
    items: fetchFromLocalStorage(),
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
      saveToLocalStorage(state.items);
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.totalQuantity -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
      saveToLocalStorage(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      saveToLocalStorage(state.items);
    },

    incrementItem: (state, action) => {
      const itemExist = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemExist) {
        itemExist.quantity++;
        state.totalQuantity++;
      }
      saveToLocalStorage(state.items);
    },

    decrementItem: (state, action) => {
      const itemExist = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (itemExist) {
        itemExist.quantity--;
        state.totalQuantity--;
      }
      saveToLocalStorage(state.items);
    },

    mergeCart: (state, action) => {
      // Merge the local cart with the cart from Firestore
      const userId = action.payload;
      if(state.items.length > 0) {
        saveCart({ userId, cart: state.items });
      } 
    }
  },
});

export const addToCartAndSave = (userId, product) => (dispatch, getState) => {
  dispatch(addToCart(product));
  if(userId) {
    //only save to Firestore if user is logged in
    const { items } = getState().cart; 
    dispatch(saveCart({ userId, cart: items })); 
  }
};

export const removeFromCartAndSave =
  (userId, productId) => (dispatch, getState) => {
    dispatch(removeFromCart({ id: productId })); // Update Redux state first

    if(userId){
      const { items } = getState().cart; // Get the updated cart items from the Redux state
      dispatch(saveCart({ userId, cart: items })) // Save the updated cart to Firestore
        .catch((error) => {
          toast.error(`Failed to save updated cart: ${error}`);
          console.error("Error saving cart to Firestore:", error);
        });
    }
    
  };

  export const incrementItemAndSave = (userId, itemId) => (dispatch, getState) => {
    dispatch(incrementItem({ id: itemId })); // Update Redux state first
    
    if(userId){
      //only save to Firestore if user is logged in
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
    
  }

    export const decrementItemAndSave = (userId, itemId) => (dispatch, getState) => {
        dispatch(decrementItem({ id: itemId })); // Update Redux state first
       
        if(userId){
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
        
    }

    export const clearCartAndSave = (userId) => (dispatch) => {
        dispatch(clearCart()); // Update Redux state first
       
       if(userId){
        dispatch(deleteFromCart(userId)) // Delete the cart from Firestore
          .then(() => {
            toast.success("Cart cleared successfully!");
          })
          .catch((error) => {
            toast.error(`Failed to clear cart: ${error}`);
            console.error("Error deleting cart from Firestore:", error);
          });
       }
        
    }

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementItem,
  decrementItem,
} = cartSlice.actions;
export default cartSlice.reducer;
