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
  getDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../config/firebase"; 
import axios from "axios";
import toast from "react-hot-toast";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async ({ files, productData }, { rejectWithValue }) => {
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
        
      };
      const docRef = await addDoc(
        collection(db, "products"),
        productWithImages
      ); 

      return { id: docRef.id, ...productWithImages }; // Returning the product with the document ID
    } catch (error) {
      console.error("Error adding product:", error);
      return rejectWithValue(error.message || "Error adding product");
    }
  }
);

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({category = "all", subcategory = null} = {}, thunkAPI) => {
    try {

      const productsRef = collection(db, "products");
      let queryRef = productsRef;

      // If a category is provided, filter by category
      if (category && category !== "all") {
        queryRef = query(queryRef, where("category", "==", category));
      } 
      
      //if subcategory is provide, addits filter
      if(subcategory) {
        queryRef =query(queryRef, where("subcategory", "==", subcategory))
      }
  
      // Get the products based on query
     const querySnapshot = await getDocs(queryRef);
     const products = querySnapshot.docs.map((doc) => ({
       id: doc.id,
       ...doc.data(),
     }));
      return products;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const fetchTrendingProducts = createAsyncThunk(
  "product/fetchTrendingProducts",
  async (_, thunkAPI) => {
    try {
      // First, get all orders to analyze product frequency
      const trendingRef = collection(db, "trending");
      const trendingQuery = query(trendingRef, orderBy("sold", "desc"), limit(8));
      const trendingSnapshot = await getDocs(trendingQuery);

      const trendingProducts = trendingSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return trendingProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);



export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() };
      } else {
        return rejectWithValue("Product not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "prooducts/editProduct",
  async ({ id, updateData }, { rejectWithValue }) => {
    try {
      const productRef = doc(db, "products", id);
      await setDoc(productRef, updateData, { merge: true });
      return { id, updateData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    trendingProducts: [],
    product: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Add new product to the state
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTrendingProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingProducts = action.payload;
        state.error = null;
      })
      .addCase(fetchTrendingProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.trendingProducts = [];
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...action.payload.updateData,
          };
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (products) => products.id !== action.payload
        );
      });
  },
});
export const { sortByPrice, sortByDateAdded, filterByCategory } = productSlice.actions;
export default productSlice.reducer;
