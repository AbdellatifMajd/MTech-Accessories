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







const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {},
    },
    extraReducers: (builder) => {

//register manage states
      builder
        .addCase(register.pending, (state) => {state.isLoading = true; })
        .addCase(register.fulfilled, (state, action) => {state.isLoading = false, state.isAuthenticated = true;})
        .addCase(register.rejected, (state, action) => {state.isLoading = false, state.user = null, state.isAuthenticated = true;})

//login manage states

.addCase(login.pending, (state) => {
  state.isLoading = true;
})
.addCase(login.fulfilled, (state, action) => {
  console.log(action);

  state.isLoading = false;
  state.user = action.payload.success ? action.payload.user : null;
  state.isAuthenticated = action.payload.success;
})
.addCase(login.rejected, (state, action) => {
  state.isLoading = false;
  state.user = null;
  state.isAuthenticated = false;
})
      
     }})



















export const {setUser} = authSlice.actions; 
export default authSlice.reducer; 