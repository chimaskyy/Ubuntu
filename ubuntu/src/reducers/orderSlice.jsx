import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { serverTimestamp } from "firebase/firestore";


//generate unique guest id
const generateGuestId = () => {
  return `guest-${Date.now()}-${Math.round(Math.random() * 1000)}`;
};

// Create a new order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ userId, orderData, isGuest }, { rejectWithValue }) => {
    try {
      const orderId = `${userId}-${Date.now()}-${Math.round(
        Math.random() * 1000
      )}`; // Generate unique order ID
      const orderRef = doc(db, "orders", orderId);

      const orderToSave = {
        ...orderData,
        userId,
        orderId,
        createdAt: serverTimestamp(),
        status: "pending", // Initial status
        paymentStatus: "pending", // Initial payment status
        isGuest,
      };

      await setDoc(orderRef, orderToSave);
      return orderToSave;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, updates }, { rejectWithValue }) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, updates);
      return { orderId, updates };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Fetch all orders for a user
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });

      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch a single order by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchOrderById",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      const orderSnap = await getDoc(orderRef);

      if (orderSnap.exists()) {
        return orderSnap.data();
      } else {
        throw new Error("Order not found");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const ordersRef = collection(db, "orders");
      const querySnapshot = await getDocs(ordersRef);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });

      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//fetchorder by email for guest
export const fetchOrderByEmail = createAsyncThunk(
  "orders/fetchOrderByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("shippingDetails.email", "==", email));
      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push(doc.data());
      });
      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    // updateOrderStatus: (state, action) => {
    //   const { orderId, status } = action.payload;
    //   const order = state.orders.find((order) => order.orderId === orderId);
    //   if (order) {
    //     order.status = status;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
        state.currentOrder = action.payload;
        toast.success("Order created successfully!");
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to create order: ${action.payload}`);
      })

      // Fetch Order by Email
      .addCase(fetchOrderByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrderByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch orders: ${action.payload}`);
      })

      //update order status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { orderId, status } = action.payload;
        const order = state.orders.find((order) => order.orderId === orderId);
        if (order) {
          order.status = status;
        }
        toast.success("Order status updated successfully!");
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to update order status: ${action.payload}`);
      })

      // Fetch User Orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch orders: ${action.payload}`);
      })

      // Fetch Single Order
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch order: ${action.payload}`);
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Failed to fetch orders: ${action.payload}`);
      });
  },
});

// Action creator to create order from cart
export const createOrderFromCart =
  (cartItems, totalAmount, shippingDetails, user = null) => 
    async (dispatch) => {
     try {
      const isGuest = !user;
      const userId = user?.uid || generateGuestId();

       const orderData = {
         items: cartItems,
         totalAmount,
         shippingDetails,
         status: "pending",
         paymentStatus: "pending",
          isGuest,
          createdAt: serverTimestamp(),
       };

       await dispatch(createOrder({ userId, orderData, isGuest }));
       toast.success("Order placed successfully!");
       return `${userId}-${orderData.createdAt}`;
     } catch (error) {
       toast.error(`Failed to create order: ${error.message}`);
       return false;
     }
   };
    

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
