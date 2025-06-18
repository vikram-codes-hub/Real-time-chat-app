import React, { useState, useContext, useEffect } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../Context/Authcontext";
import { ChatContext } from "../Context/Chatcontext";

const Sidebar = () => {
  const {
    getusers,
    users,
    selectedusers,
    setselectedusers,setunseenmessages,
    unseenmessages,
  } = useContext(ChatContext);

  const { Logout, onlineuser } = useContext(Authcontext);

  const [input, setinput] = useState("");
  const navigate = useNavigate();

  const filterusers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getusers();
  }, [onlineuser]);

  return (
    <div
      className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${
        selectedusers ? "max-md:hidden" : ""
      }`}
    >
      <div className="pb-5">
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="" className="max-w-40" />
          <div className="group relative py-2">
            <img
              src={assets.menu_icon}
              className="max-h-5 cursor-pointer"
              alt=""
            />
            <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              >
                Edit profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={Logout} className="cursor-pointer text-sm">
                Logout
              </p>
            </div>
          </div>
        </div>

        <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
          <img src={assets.search_icon} className="w-3" alt="" />
          <input
            onChange={(e) => setinput(e.target.value)}
            type="text"
            className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
            placeholder="Search User...."
          />
        </div>
      </div>

      <div className="flex flex-col">
        {filterusers.map((user, index) => (
          <div
            onClick={() => {
  setselectedusers(user);
  setunseenmessages((prev) => {
    const updated = { ...prev };
    delete updated[user._id]; // ✅ remove unseen count for this user
    return updated;
  });
}}

            key={user._id || index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${
              selectedusers?._id === user._id && "bg-[#282142]/50"
            }`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-[35px] aspect-[1/1] rounded-full"
            />
            <div className="flex flex-col leading-5">
              <p>{user.fullName}</p>
              {onlineuser.includes(user._id?.toString()) ? (
  <span className="text-green-400 text-xs">Online</span>
) : (
  <span className="text-neutral-400 text-xs">Offline</span>
)}

            </div>
            {unseenmessages[user._id] > 0 && (
              <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {unseenmessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
