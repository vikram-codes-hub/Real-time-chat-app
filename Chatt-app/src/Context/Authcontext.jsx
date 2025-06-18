import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { toast, Toaster } from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = backendUrl;
export const Authcontext = createContext();

export const Authprovider = ({ children }) => {
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [authuser, setauthuser] = useState(null);
  const [onlineuser, setonlineuser] = useState([]);
  const [socket, setsocket] = useState(null);

  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");

      if (data.success) {
        setauthuser(data.user);
        connectsocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data.success) {
        setauthuser(data.UserData); // ✅ match backend key
        connectsocket(data.UserData);
        axios.defaults.headers.common["token"] = data.token; // ✅ fixed typo
        settoken(data.token);
        localStorage.setItem("token", data.token);
        toast.success(data.msg); // ✅ match backend key
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const Logout = async () => {
    localStorage.removeItem("token");
    settoken(null);
    setauthuser(null);
    setonlineuser([]);
    axios.defaults.headers.common["token"] = null;
    toast.success("Logout successfully");
    socket?.disconnect();
  };

  const updateprofile = async (body) => {
    try {
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setauthuser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const connectsocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });
    newSocket.connect();

    setsocket(newSocket);
    newSocket.on("getOnlineUsers", (userIds) => {
      setonlineuser(userIds);
    });
  };

 useEffect(() => {
  if (token) {
    axios.defaults.headers.common["token"] = token;
    checkAuth();
  }
}, [token]);


  const value = {
    axios,
    token,
    authuser,
    onlineuser,
    socket,
    Login,
    Logout,
    updateprofile,
  };

  return (
    <Authcontext.Provider value={value}>
      <Toaster position="top-right" />
      {children}
    </Authcontext.Provider>
  );
};
