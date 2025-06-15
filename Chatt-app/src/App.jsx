import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Chat from './Pages/Chat'
import Profile from './Pages/Profile'
import Home from './Pages/Home'

const App = () => {
  return (
   <>
   <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/chat' element={<Chat/>}/>
    <Route path='/profile' element={<Profile/>}/>
   </Routes>
   </div>
   </>
  )
}

export default App
