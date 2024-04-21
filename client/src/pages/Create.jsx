import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { addUser } from '../redux/register'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BasicExample from './Navi'
const Create = () => {

  const [userData,setUser]=useState()
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.user)
  const navigate=useNavigate()
  useEffect(()=>{
    if(user)
    navigate('/myarticles')
  })
  return (
    <div>
         <BasicExample></BasicExample>
      <input type="username" placeholder='username' onChange={(e)=>setUser({...userData,username:e.target.value})}/>
      <input type="email"  placeholder='email' onChange={(e)=>setUser({...userData,email:e.target.value})}/>
     <button onClick={(e)=>{
        e.preventDefault()
        dispatch(addUser(userData))

     }}>Register</button>
    </div>
  )
}

export default Create
