import React from 'react'
import { useEffect } from 'react';
import {useNavigate}  from 'react-router-dom';
export default function Dashboard() {
    const history = useNavigate();
    useEffect(()=>{
        const token = sessionStorage.getItem('access_token');
        if(token == null){
            history('/');
        }
    },[])
  return (
    <div className='container'>
        <h1 className='title'>Dashboard</h1>
    </div>
  )
}
