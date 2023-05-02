import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const response = await api.post("/users", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    console.log(data);
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
      console.log(action.payload);
      state.isLoggedIn = true;
      // Update the state with the received user data
      state.token = action.payload.token;
      state.user = action.payload.userResponse;
      state.status = "succeeded";
      state.error = null;
      // Store the token in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.userResponse);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      // Handle the registration success case
      state.status = "succeeded";
      // Update the state with the received user data
      state.token = action.payload.token;
      state.user = action.payload.userResponse;
      // Store the token & user in localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.userResponse);
    });
    builder.addCase(signUp.rejected, (state, action) => {
      // Handle the registration error case
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
