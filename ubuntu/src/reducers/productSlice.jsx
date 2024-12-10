
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase"; // Adjust paths to your configuration
import axios from "axios";
import toast from "react-hot-toast";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ files, productData, category }, { rejectWithValue }) => {
    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      // Upload multiple images to Cloudinary
      const imageUploadPromises = files.map((file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ubuntu");
        return axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          )
          .then((response) => response.data.secure_url)
          .catch((err) => {
            console.error("Image upload failed", err);
            toast.error("Failed to upload an image.");
            return null; // Return null for failed uploads
          });
      });
      const imageUrls = (await Promise.all(imageUploadPromises)).filter(
        (url) => url
      );
 // Wait for all uploads to complete
      console.log("Uploaded images:", imageUrls);

      // Add product to Firestore
      const productWithImages = {
        ...productData,
        imageUrls: imageUrls || [],
        category,
      };
      const docRef = await addDoc(collection(db, "products"), productWithImages); // Awaiting `addDoc`

      console.log("Product added to Firestore:", productWithImages);
      console.log("Document written with ID: ", docRef.id);
      return { id: docRef.id, ...productWithImages }; // Returning the product with the document ID
    } catch (error) {
      console.error("Error adding product:", error);
      return rejectWithValue(error.message || "Error adding product");
    }
  }
);


export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (category = "", thunkAPI) => {
    try {
      const q =
        category === ""
          ? getDocs(collection(db, "products"))
          : getDocs(
              query(
                collection(db, "products"),
                where("category", "==", category)
              )
            );
      const products = (await q).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const editProduct = createAsyncThunk(
  'prooducts/editProduct',
  async ({id, updateData}, {rejectWithValue}) =>{
    try{
      const productRef = doc(db, 'products', id);
      await setDoc(productRef, updateData, {merge: true});
      return {id, updateData}
    } catch (error){
      return rejectWithValue(error.message);
    }
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = "success";
        state.products.push(action.payload); // Add new product to the state
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        )
        if (index !== -1) {
          state.products[index] = {
            ...state.products[index], 
            ...action.payload.updateData
          }
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (products) => products.id !== action.payload
        );
      })
  },
});

export default productSlice.reducer;