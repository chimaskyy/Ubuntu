import { auth, googleProvider } from "../config/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Google Authentication
export const authenticateWithGoogle = createAsyncThunk(
  "user/authenticateWithGoogle",
  async (_, thunkAPI) => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      const displayName = user.displayName || "Google User";
      console.log("Authenticated user:", user);
      return { ...user, displayName };
    } catch (error) {
      console.error("Google Authentication Error:", error);
      return thunkAPI.rejectWithValue("Google sign-in failed.");
    }
  }
);

// Email/Password Sign-Up
export const signUpWithEmail = createAsyncThunk(
  "user/signUpWithEmail",
  async ({ email, password, username }, thunkAPI) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: username });
      console.log("Signed up user:", userCredential.user);
      return { ...userCredential.user, displayName: username };
    } catch (error) {
      console.error("Sign-Up Error:", error);
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
      console.log("Logged in user:", userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Login Error:", error);
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
      console.log("User logged out.");
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
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
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

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

// Monitor Auth State
export const monitorAuthState = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const displayName = user.displayName || "";
      dispatch(setUser({ ...user, displayName }));
    } else {
      dispatch(setUser(null));
    }
  });
};
