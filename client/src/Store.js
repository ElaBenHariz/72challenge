import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './redux/ArticleSlice';
import registerReducer from './redux/register';

const store = configureStore({
  reducer: {
     articles: articlesReducer,

     user:registerReducer
  } 
});

export default store;