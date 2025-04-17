import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};


//register asyncThunk
export const register = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);




//login asyncThunk 
export const login = createAsyncThunk ("/auth/login", async (formData) => {
  const response = await axios.post("http://localhost:8000/api/auth/login", formData, {withCredentials: true})
  return response.data;
})







//register slicing
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state) => {state.isLoading = true; })
        .addCase(register.fulfilled, (state, action) => {state.isLoading = false; state.user = null; state.isAuthenticated = false;})
        .addCase(register.rejected, (state, action) => {state.isLoading = false; state.user = null; state.isAuthenticated = false;})



        .addCase(login.pending, (state) => {state.isLoading= true})
        .addCase(login.fulfilled, (state, action) => {state.isLoading= false, state.isAuthenticated= true, state.user= action.payload})
        .addCase(login.rejected, (state) => {state.isLoading= false, state.isAuthenticated= false, state.user= null})
      
     }})



















export const {setUser} = authSlice.actions; 
export default authSlice.reducer; 