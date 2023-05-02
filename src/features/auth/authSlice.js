import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/register", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/login", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    status: null,
    user: null,
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    logout: (state) => {
      console.log("logout");
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.status = "succeeded";
      state.error = null;
      // Store the token in localStorage
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(register.fulfilled, (state, action) => {
      // Handle the registration success case
      state.status = "succeeded";
      // Update the state with the received user data
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      // Handle the registration error case
      state.status = "failed";
      state.error = action.payload.error;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
