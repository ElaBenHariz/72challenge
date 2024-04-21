
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  articles: [],
  myarticles:[],
  loading: false,
  success:false,
  error: null
};
export const getArticles=createAsyncThunk("article/get",async (ThunkAPI)=>{

    try {
      const response=await axios.get("http://localhost:5000/articles")
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })
  export const getMyArticles=createAsyncThunk("article/getMine",async (id,ThunkAPI)=>{

    try {
      const response=await axios.get("http://localhost:5000/articles/"+id)
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })
  export const addArt=createAsyncThunk("article/add",async (data,ThunkAPI)=>{

    try {
      const response=await axios.post("http://localhost:5000/articles/",data)
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })
  export const deleteArticle=createAsyncThunk("article/delete",async (id,ThunkAPI)=>{

    try {
      const response=await axios.delete("http://localhost:5000/articles/"+id)
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(getArticles.fulfilled,(state,action)=>{
       state.articles=action.payload
       state.loading=false;
       state.success=true;
       state.error=null;
    })
    builder.addCase(getMyArticles.fulfilled,(state,action)=>{
      state.myarticles=action.payload
      state.loading=false;
      state.success=true;
      state.error=null;

   });
   builder.addCase(addArt.fulfilled,(state,action)=>{
    state.myarticles=action.payload
    state.loading=false;
    state.success=true;
    state.error=null;

 });
 builder.addCase(deleteArticle.fulfilled,(state,action)=>{
    
    state.loading=false;
    state.success=true;
    state.error=null;

 });

  }});

export default articlesSlice.reducer;
