import { db } from "../config/firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Fetch users with order counts
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (_, thunkAPI) => {
    try {
      // Fetch all users
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        orderCount: 0,
        cancelledOrders: 0,
        totalSpent: 0,
      }));

      // Fetch all orders
      const orderCollection = collection(db, "orders");
      const orderSnapshot = await getDocs(orderCollection);

      // Create a map to store order statistics per user
      const userOrderStats = new Map();

      orderSnapshot.forEach((doc) => {
        const order = doc.data();
        const customerId = order.userId;

        if (!userOrderStats.has(customerId)) {
          userOrderStats.set(customerId, {
            totalOrders: 0,
            cancelledOrders: 0,
            activeOrders: 0,
            totalSpent: 0,
          });
        }

        const stats = userOrderStats.get(customerId);
        stats.totalOrders++;

        if (order.status === "cancelled") {
          stats.cancelledOrders++;
        } else {
          stats.activeOrders++;
          stats.totalSpent += parseFloat(order.totalAmount) || 0;
        }
      });

      // Combine user data with order statistics
      const enrichedUsers = users.map((user) => {
        const stats = userOrderStats.get(user.uid) || {
          totalOrders: 0,
          cancelledOrders: 0,
          activeOrders: 0,
          totalSpent: 0,
        };

        return {
          ...user,
          totalOrders: stats.totalOrders,
          cancelledOrders: stats.cancelledOrders,
          activeOrders: stats.activeOrders,
          totalSpent: stats.totalSpent,
          isCustomer: stats.totalOrders > 0,
        };
      });

      return enrichedUsers;
    } catch (error) {
      console.error("Fetch Users Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch users.");
    }
  }
);

// Fetch user by ID with order details
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, thunkAPI) => {
    try {
      // Fetch user data
      const userDocRef = doc(db, "users", userId);
      const userSnap = await getDoc(userDocRef);

      if (!userSnap.exists()) {
        return thunkAPI.rejectWithValue("User not found.");
      }

      const userData = userSnap.data();

      // Fetch user's orders
      const orderCollection = collection(db, "orders");
      const q = query(orderCollection, where("userId", "==", userId));
      const orderSnapshot = await getDocs(q);

      let orderStats = {
        totalOrders: 0,
        cancelledOrders: 0,
        activeOrders: 0,
        totalSpent: 0,
        recentOrders: [],
      };

      orderSnapshot.forEach((doc) => {
        const order = doc.data();
        orderStats.totalOrders++;

        if (order.status === "cancelled") {
          orderStats.cancelledOrders++;
        } else {
          orderStats.activeOrders++;
          orderStats.totalSpent += parseFloat(order.totalAmount) || 0;
        }

        // Keep track of recent orders
        orderStats.recentOrders.push({
          id: doc.id,
          ...order,
        });
      });

      // Sort recent orders by date
      orderStats.recentOrders.sort((a, b) => 
         {const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA})

      return {
        ...userData,
        ...orderStats,
        isCustomer: orderStats.totalOrders > 0,
      };
    } catch (error) {
      console.error("Fetch User by ID Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch user.");
    }
  }
);

// Fetch customers with order statistics
export const fetchCustomers = createAsyncThunk(
  "user/fetchCustomers",
  async (_, thunkAPI) => {
    try {
      const orderCollection = collection(db, "orders");
      const orderSnapshot = await getDocs(orderCollection);

      const customerStats = new Map();

      orderSnapshot.forEach((doc) => {
        const order = doc.data();
        const customerId = order.userId;

        if(!customerId) return;

        if (!customerStats.has(customerId)) {
          customerStats.set(customerId, {
            totalOrders: 0,
            cancelledOrders: 0,
            activeOrders: 0,
            totalSpent: 0,
          });
        }

        const stats = customerStats.get(customerId);
        stats.totalOrders++;

        if (order.status === "cancelled") {
          stats.cancelledOrders++;
        } else {
          stats.activeOrders++;
          stats.totalSpent += order.totalAmount || 0;
        }
      });

      // Fetch customer details
      const customerPromises = Array.from(customerStats.keys()).map(
        async (customerId) => {
          const userDocRef = doc(db, "users", customerId);
          const userSnap = await getDoc(userDocRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            const stats = customerStats.get(customerId);

            return {
              id: customerId,
              ...userData,
              ...stats,
            };
          }
          return null;
        }
      );

      const customers = (await Promise.all(customerPromises)).filter(Boolean);

      // Sort customers by number of active orders
      return customers.sort((a, b) => b.activeOrders - a.activeOrders);
    } catch (error) {
      console.error("Fetch Customers Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch customers.");
    }
  }
);

// Slice configuration
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    customers: [],
    selectedUser: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedUser = action.payload;
        state.error = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customers = action.payload;
        state.error = null;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;