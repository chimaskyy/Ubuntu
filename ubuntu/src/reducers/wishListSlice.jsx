import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDoc,
  deleteField,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";

// Fetch wishlist items
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId) => {
    try {
      const wishlistRef = doc(db, "wishlists", userId);
      const wishlistSnap = await getDoc(wishlistRef);

      if (wishlistSnap.exists()) {
        return wishlistSnap.data().items || [];
      }
      return [];
    } catch (error) {
      console.error("Fetch Wishlist Error:", error);
      throw error;
    }
  }
);

// Add item to wishlist
export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ userId, product }) => {
    try {
      const wishlistRef = doc(db, "wishlists", userId);
      const wishlistSnap = await getDoc(wishlistRef);

      let items = [];
      if (wishlistSnap.exists()) {
        items = wishlistSnap.data().items || [];
      }

      // Check if item already exists
      if (!items.some((item) => item.id === product.id)) {
        items.push(product);
        await setDoc(wishlistRef, { items }, { merge: true });
        toast.success("Added to wishlist");
      }

      return items;
    } catch (error) {
      console.error("Add to Wishlist Error:", error);
      throw error;
    }
  }
);

// Remove item from wishlist
export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async ({ userId, productId } ) => {
    try {
      const wishlistRef = doc(db, "wishlists", userId);
      const wishlistSnap = await getDoc(wishlistRef);

      if (wishlistSnap.exists()) {
        const items = wishlistSnap
          .data()
          .items.filter((item) => item.id !== productId);
        await setDoc(wishlistRef, { items }, { merge: true });
        toast.success("Removed from wishlist");
        return items;
      }
      return [];
    } catch (error) {
      console.error("Remove from Wishlist Error:", error);
      throw error;
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
