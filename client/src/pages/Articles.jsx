import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '../redux/ArticleSlice';
import { useEffect } from 'react';
import Article from './Article';
function Articles() {
    const {articles}=useSelector(state=>state.articles)
    const dispatch=useDispatch()
    useEffect(()=>{
       dispatch(getArticles())
    },[])
  return (
    <div>
        <h1>Articles</h1>
        <div>
            {articles.map((article)=>(
           <Article key={article._id} article={article}></Article>
            ))}
        </div>
    </div>
  )
}

export default Articles
