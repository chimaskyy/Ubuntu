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
} from "firebase/firestore";
import { db } from "../config/firebase"; 
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
      const docRef = await addDoc(
        collection(db, "products"),
        productWithImages
      ); 

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
  async ({category = "all", sortBy = ""} = {}, thunkAPI) => {
    try {

      const productsRef = collection(db, "products");
      let queryRef = productsRef;

      // If a category is provided, filter by category
      if (category && category !== "all") {
        queryRef = query(queryRef, where("category", "==", category));
      }  

      //apply sorting based on the sortBy parameter
      if (sortBy){
        switch (sortBy) {
          case "low-to-high":
            queryRef = query(queryRef, orderBy("price", "asc"));
            break;
          case "high-to-low":
            queryRef = query(queryRef, orderBy("price", "desc"));
            break;
          case "newest":
            queryRef = query(queryRef, orderBy("createdAt", "desc"));
            break;
          case "oldest":
            queryRef = query(queryRef, orderBy("createdAt", "asc"));
            break;
          default:
            queryRef = query(queryRef, orderBy("createdAt", "desc"));
        }
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
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      console.log(
        "Orders Snapshot:",
        ordersSnapshot.docs.map((doc) => doc.data())
      );
      
      // Create a map to track product order frequency
      const productFrequency = new Map();
      
      // Count the frequency of each product in orders
      ordersSnapshot.docs.forEach(doc => {
        const order = doc.data();
        order.items.forEach(item => {
          const currentCount = productFrequency.get(item.id) || 0;
          productFrequency.set(item.id, currentCount + item.quantity);
        });
      });
      console.log(
        "Product Frequency Map:",
        Array.from(productFrequency.entries())
      );

      // Convert the map to an array and sort by frequency
      const sortedProductIds = Array.from(productFrequency.entries())
        .sort(([, a], [, b]) => b - a) // Sort by frequency descending
        .slice(0, 2) // Get top 8 products
        .map(([id]) => id);
        console.log("Sorted Product IDs (Top Trending):", sortedProductIds);

      // If no products found, return empty array
     if (sortedProductIds.length === 0) {
       console.warn("No trending products found.");
       return [];
     }

      // Fetch the actual product details for the trending products
      const productsRef = collection(db, "products");
      const productsSnapshot = await getDocs(productsRef);

      
      const products = productsSnapshot.docs
        .filter((doc) => sortedProductIds.includes(doc.id))
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          orderCount: productFrequency.get(doc.id) || 0,
        }));
      console.log("Trending Products:", products);
        // change to not sort, but just display the products randomly
      // Sort products by their order frequency
      return products.sort((a, b) => b.orderCount - a.orderCount);
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
