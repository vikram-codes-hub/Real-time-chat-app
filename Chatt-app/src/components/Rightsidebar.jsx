import React, { useContext, useState, useEffect } from "react";
import assets from "../assets/assets";
import { Authcontext } from "../Context/Authcontext";
import { ChatContext } from "../Context/Chatcontext";

const Rightsidebar = () => {
  const { selectedusers, messages } = useContext(ChatContext);
  const { Logout, onlineuser } = useContext(Authcontext);
  const [mssgImg, setMsgImg] = useState([]);

  // Get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImg(
      messages.filter((msg) => msg.image).map((msg) => msg.image)
    );
  }, [messages]);

  return (
    selectedusers && (
      <div
        className={`bg-[#3A3B52]/90 text-white w-full h-full relative overflow-y-auto scrollbar-hide ${
          selectedusers ? "max-md:hidden" : ""
        }`}
      >
        {/* Profile Section  */}
        <div className="pt-8 pb-4 flex flex-col items-center gap-3 text-sm font-light px-4">
          <img
            src={selectedusers.profilePic || assets.avatar_icon}
            className="w-24 h-24 rounded-full object-cover border-2 border-violet-400/50"
            alt="Profile"
          />
          <div className="text-center">
            <h1 className="text-xl font-medium flex items-center justify-center gap-2">
              {onlineuser.includes(selectedusers._id) && (
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              )}
              {selectedusers.fullName}
            </h1>
            <p className="mt-2 text-gray-300 max-w-xs">{selectedusers.bio}</p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-t border-gray-600/50 my-4 mx-6" />

        {/* Media Section  */}
        <div className="px-6 pb-16">
          <p className="text-lg font-medium mb-3 text-gray-300">Media</p>
          <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-transparent">
            {mssgImg.map((image, index) => (
              <div
                className="cursor-pointer rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20"
                key={index}
                onClick={() => window.open(image)}
              >
                <img
                  src={image}
                  className="w-full h-24 object-cover rounded-lg"
                  alt={`Media ${index + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Logout Button  */}
        <div className="absolute bottom-5 left-0 right-0 bg-[#3A3B52]/90 backdrop-blur-sm py-3 px-6">
          <button
            onClick={() => Logout()}
            className="w-full bg-gradient-to-r from-purple-500 to-violet-600 text-white text-sm font-medium py-2.5 px-4 rounded-full cursor-pointer 
            hover:from-purple-600 hover:to-violet-700 transition-all duration-200 shadow-md hover:shadow-violet-500/30
            active:scale-95 flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default Rightsidebar;