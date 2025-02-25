import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://reqres.in/api/users";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

// Initial state
const initialState: UsersState = {
  users: [],
  loading: false,
  totalPages: 1, // Default value
  currentPage: 1, // Default value
  error: null,
};

// Fetch users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}?page=${page}`);
      return response.data; // Return full response including `total_pages`
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to fetch users"
      );
    }
  }
);

// Create user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to create user"
      );
    }
  }
);

// Update user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (
    { id, userData }: { id: number; userData: Partial<User> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return { id, ...response.data };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to update user"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to delete user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data; // API returns users inside `data`
        state.totalPages = action.payload.total_pages; // Update total pages
        state.currentPage = action.payload.page; // Update current page
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = "Failed to fetch users...";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add new user to list
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) state.users[index] = action.payload; // Update user
      });
  },
});

export default userSlice.reducer;
