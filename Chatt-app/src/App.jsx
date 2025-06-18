import React,{useContext} from 'react'
import { Route, Routes,Navigate } from 'react-router-dom'
import Login from './Pages/Login'

import Profile from './Pages/Profile'
import Home from './Pages/Home'
import {Toaster} from "react-hot-toast"
import { Authcontext } from './Context/Authcontext'


const App = () => {
  

  const {authuser}=useContext(Authcontext)
  return (
   <>
   <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
   <Toaster/>
    <Routes>
    <Route path='/' element={authuser?<Home/>:<Navigate to="/login"/>}/>
    <Route path='/login' element={!authuser?<Login/>:<Navigate to="/"/>}/>
    <Route path='/profile' element={authuser?<Profile/>:<Navigate to="/"/>}/>
   </Routes>
   </div>
   </>
  )
}

export default App
