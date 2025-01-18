import { auth, db } from "../config/firebase";
import { doc, setDoc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Fetch users
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const users = usersSnapshot.docs.map((doc) => doc.data());

      return users;
    } catch (error) {
      console.error("Fetch Users Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch users.");
    }
  }
);

// Fetch user by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);

      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        return thunkAPI.rejectWithValue("User not found.");
      }
    } catch (error) {
      console.error("Fetch User by ID Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch user.");
    }
  }
);

// fetch customers
export const fetchCustomers = createAsyncThunk(
  "user/fetchCustomers",
  async (_, thunkAPI) => {
    try {
      const orderCollection = collection(db, "orders");
      const q = query(orderCollection, where("status", "!==", "cancelled")); 
      const orderSnapshot = await getDocs(q);
      const customerId = new Set();
      orderSnapshot.forEach((doc) => {
        customerId.add(doc.data().customerId);
      });
      return Array.from(customerId);
    } catch (error) {
      console.error("Fetch Customers Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch customers.");
    }
  }
);

