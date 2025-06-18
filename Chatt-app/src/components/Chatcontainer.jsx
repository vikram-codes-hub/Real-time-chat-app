import React, { useEffect, useRef, useContext, useState } from "react";
import assets, { messagesDummyData } from "../assets/assets";
import { formatMessageTime } from "../lib/utils";
import { ChatContext } from "../Context/Chatcontext";
import { Authcontext } from "../Context/Authcontext";
import { toast } from "react-hot-toast";

const Chatcontainer = () => {
  const scrollend = useRef();
  const {
    messages,

    selectedusers,
    setselectedusers,
    sendmessage,
    getmessage,
  } = useContext(ChatContext);
  const { authuser, onlineuser } = useContext(Authcontext);
  const [input, setinput] = useState("");

  //handel sending an message

  const handlesendmessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return null;
    await sendmessage({ text: input.trim() });
    setinput("");
  };

  //handel sending images
  const handelSendimages = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("select an valid image to send");
    }
    const render = new FileReader();

    render.onload = async () => {
      await sendmessage({ image: render.result });
      e.target.value = "";
    };
    render.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedusers) {
      getmessage(selectedusers._id);
    }
  },[selectedusers]);

  useEffect(() => {
    if (scrollend.current && messages) {
      scrollend.current.scrollIntoView({ behavior: "auto" });
    }
  }, [messages]);

  return selectedusers ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* Header */}
      <div className="flex justify-between items-center gap-3 py-3 mx-4 border-b border-stone-500">
        <div className="flex items-center gap-3">
          <img
            src={selectedusers.profilePic || assets.avatar_icon}
            alt=""
            className="w-8 rounded-full"
          />
          <p className="text-white">
            {selectedusers.fullName}
            {onlineuser.includes(selectedusers._id)}{" "}
            <span className="w-2 h-2 rounded-full inline-block ml-2 bg-green-500"></span>
          </p>
          <img
            onClick={() => setselecteduser(null)}
            src={assets.arrow_icon}
            className="md:hidden w-7"
            alt=""
          />
        </div>
        <img src={assets.help_icon} className="max-md:hidden w-5" alt="" />
      </div>

      {/* Chat */}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-auto p-3 pb-6">
      {messages.map((msg, index) => {
  if (!msg || !msg.senderId) return null; // ⛑️ Skip invalid message

  const isSender = msg.senderId === authuser._id;
  return (
    <div
      key={index}
      className={`flex items-center gap-3 ${
        isSender ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="flex items-center flex-col text-center text-xs">
        <img
          src={
            isSender
              ? authuser?.profilePic || assets.avatar_icon
              : selectedusers?.profilePic || assets.avatar_icon
          }
          className="w-7 rounded-full"
          alt=""
        />
        <p className="text-white">{formatMessageTime(msg.createdAt)}</p>
      </div>

      {msg.image ? (
        <img
          className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
          src={msg.image}
          alt=""
        />
      ) : (
        <p
          className={`p-2 max-w-[280px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${
            isSender ? "rounded-bl-none" : "rounded-br-none"
          }`}
        >
          {msg.text}
        </p>
      )}
    </div>
  );
})}

        <div ref={scrollend}></div>
      </div>

      {/* {bottom area} */}
      <div className="absolute bottom-0 w-full flex items-center gap-3 p-3">
        <div className=" flex-1 flex items-center bg-gray-100/12 px-3 rounded-full ">
          <input
            onChange={(e) => setinput(e.target.value)}
            value={input}
            onKeyDown={(e) => (e.key === "Enter" ? handlesendmessage(e) : null)}
            type="text"
            placeholder="Send a message"
            className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400"
          />
          <input
            onChange={handelSendimages}
            type="file"
            id="image"
            accept="image/png,image/jpg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              alt=""
              className="w-5 mr-2 cursor-pointer"
            />
          </label>
        </div>
        <img
          onClick={handlesendmessage}
          src={assets.send_button}
          className="w-7 cursor-pointer"
          alt=""
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default Chatcontainer;
