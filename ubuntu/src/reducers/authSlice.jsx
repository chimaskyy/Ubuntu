import { auth, googleProvider, db } from "../config/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// Google Authentication
export const authenticateWithGoogle = createAsyncThunk(
  "user/authenticateWithGoogle",
  async (_, thunkAPI) => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const displayName = user.displayName
        ? user.displayName.split(" ")[0]
        : "User";
        console.log("User's first name:", displayName);

        toast.success(`Welcome, ${displayName}!`);
      const userRole = ["user"];

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: displayName,
        email: user.email,
        phone: user.phoneNumber || null,
        photoURL: user.photoURL || null,
        role: userRole,
        createdAt: new Date().toISOString(),
      });

      return { ...user, displayName };
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      return thunkAPI.rejectWithValue("Google sign-in failed.");
    }
  }
);

// Email/Password Sign-Up
export const signUpWithEmail = createAsyncThunk(
  "user/signUpWithEmail",
  async ({ email, password, name, phone, photo }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });

      const user = userCredential.user;
      const userRole = ["user"];
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: name,
        email: user.email,
        phone: phone || null,
        photoURL: photo || null,
        role: userRole,
        createdAt: new Date().toISOString(),
      });

      return { ...user, displayName: name, phone, photoURL: photo };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Sign-Up failed.");
    }
  }
);

// Email/Password Login
export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, thunkAPI) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return userCredential.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Login failed.");
    }
  }
);

// Logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      await signOut(auth);

      return null;
    } catch (error) {
      console.error("Logout Error:", error);
      return thunkAPI.rejectWithValue("Logout failed.");
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    status: null,
    error: null,
    isLoading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoading = false;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateWithGoogle.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateWithGoogle.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(authenticateWithGoogle.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(signUpWithEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpWithEmail.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(signUpWithEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "success";
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

// Monitor Auth State
export const monitorAuthState = () => (dispatch) => {
  // Start loading state
  dispatch(setUser({ loading: true }));

  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          dispatch(setUser({ ...user, ...userData, loading: false }));
        } else {
          console.error("User document not found in Firestore.");
          dispatch(clearUser());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(clearUser());
      }
    } else {
      dispatch(clearUser());
    }
  });
};
