import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import {useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Login from './Login'
const layout = () => {

  const {user, loading} = useSelector(state => state.auth )
  if (loading){
    return <Loader/>
  }
  return (
    <div>
      {
        user? (<div className='min-h-screen bg-black'>
        <Navbar />
        <Outlet/>    
      </div>
        ) : 
          <Login/>
      }
    </div> 
  )
}

export default layout