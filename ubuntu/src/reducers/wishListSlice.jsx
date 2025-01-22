import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";


// Fetch wishlist wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (userId) => {
    try {
      const wishlistRef = doc(db, "wishlists", userId);
      const wishlistSnap = await getDoc(wishlistRef);

      if (wishlistSnap.exists()) {
        return wishlistSnap.data().wishlist || [];
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

      let wishlist = [];
      if (wishlistSnap.exists()) {
        wishlist = wishlistSnap.data().wishlist || [];
      }

      // Check if item already exists
      if (!wishlist.some((item) => item.id === product.id)) {
        wishlist.push(product);
        await setDoc(wishlistRef, { wishlist }, { merge: true });
       
      }

      return wishlist;
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
        const wishlist = wishlistSnap
          .data()
          .wishlist.filter((item) => item.id !== productId);
        await setDoc(wishlistRef, { wishlist }, { merge: true });
       
        return wishlist;
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
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })
      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
