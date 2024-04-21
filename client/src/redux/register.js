
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user:JSON.parse(localStorage.getItem('user')),
  loading: false,
  success:false,
  error: null
};
export const addUser=createAsyncThunk("user/add",async (data,ThunkAPI)=>{

    try {
      const response=await axios.post("http://localhost:5000/users",data)

      localStorage.setItem('user',JSON.stringify(response.data))
      
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })



const registerSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(addUser.fulfilled,(state,action)=>{
       state.user=action.payload
       state.loading=false;
       state.success=true;
       state.error=null;
    })

   }});
   export default registerSlice.reducer;
