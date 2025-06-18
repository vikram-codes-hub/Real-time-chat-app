import React, { useState,useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Chatcontainer from '../components/Chatcontainer'
import Rightsidebar from '../components/Rightsidebar'
import { ChatContext } from '../Context/Chatcontext'

const Home = () => {
const { selectedusers}=useContext(ChatContext)
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
      <div className={`grid grid-cols-1 relative backdrop-blur-xl  border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] ${ selectedusers?'md:grid-cols-[1fr_1.5fr_1fr] xl:[1fr_2fr_1fr':'md:grid-cols-2'}`}>
        <Sidebar />
        <Chatcontainer />
        <Rightsidebar />
      </div>
    </div>
  )
}

export default Home
