import React, { useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [selectedImg, setselectedImg] = useState(null);
  const navigate = useNavigate();
  const [name, setname] = useState("Vikram singh gangwar");
  const [bio, setbio] = useState("");


  const handelsubmit=async(e)=>{
    e.preventDefault()
    navigate('/')
  }
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      <div className="w-5/6 max-w-2xl background-blur-2xl text-gray-300 border-2 border-gray-600 items-center justify-between max-sm:flex-col-reverse rounded-lg  flex">
        <form onSubmit={handelsubmit} className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg">Profile details</h3>
          <div className="flex items-center gap-3">
            <label
              htmlFor="avatar"
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                onChange={(e) => setselectedImg(e.target.files[0])}
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                hidden
              />
              <img
                src={
                  selectedImg
                    ? URL.createObjectURL(selectedImg)
                    : assets.avatar_icon
                }
                className={`w-12 h-12 ${selectedImg && "rounded-full"}`}
                alt=""
              />
            </label>
            <p className="text-sm font-medium">Upload profile image</p>
          </div>

          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="Your name"
            className="border p-2 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            onChange={(e) => setbio(e.target.value)}
            value={bio}
            className="border p-2 text-sm border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Write Profile bio"
            required
          ></textarea>

          <button type="submit"
            className="w-1/4 mx-auto bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-medium py-2.5 px-4 rounded-full cursor-pointer 
          hover:from-purple-600 hover:to-violet-700 transition-all duration-200 shadow-md hover:shadow-violet-500/30
          active:scale-95 flex items-center justify-center gap-2"
          >
            Save
          </button>
        </form>
         <div className="bg-gradient-to-b from-violet-900/30 to-purple-900/30 flex items-center justify-center p-8 md:p-10 border-t md:border-t-0 md:border-l border-gray-700/50">
          <div className="text-center">
           <img 
  src={assets.logo_icon} 
  className="w-56 h-56 md:w-64 md:h-64 object-contain mx-auto mb-6 animate-float" 
  alt="App Logo" 
/>

            <h3 className="text-xl font-bold text-white mb-2">ChatApp</h3>
            <p className="text-gray-300 text-sm max-w-xs">Connect with friends and colleagues in real-time</p>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Profile;
