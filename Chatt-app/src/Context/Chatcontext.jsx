import { createContext, useState, useContext, useEffect } from "react";
import { Authcontext } from "./Authcontext";
import { toast } from "react-hot-toast";

// Create a new context for chat
export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // States to manage chat data
  const [users, setusers] = useState([]);                     // All users available for chat
  const [messages, setmessages] = useState([]);               // Messages for the selected user
  const [selectedusers, setselectedusers] = useState(null);   // Currently selected user for chat
  const [unseenmessages, setunseenmessages] = useState({});   // Track unseen message count per user

  const { socket, axios } = useContext(Authcontext);          // Get socket and axios from Auth context

  // Fetch list of users and unseen messages
  const getusers = async () => {
    try {
      const { data } = await axios.get("/api/messages/users");
      if (data.success) {
        setusers(data.users);
        setunseenmessages(data.unseenmessages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch messages from a selected user
  const getmessage = async (userId) => {
    try {
      const { data } = await axios.get(`/api/messages/${userId}`);
      if (data.success) {
        setmessages(data.messages);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Send a message to the selected user
  const sendmessage = async (messageData) => {
    try {
      const { data } = await axios.post(
        `/api/messages/send/${selectedusers._id}`,
        messageData
      );
      if (data.success) {
        // Add new message to local state
        setmessages((prev) => [...prev, data.message]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Subscribe to socket events for new messages
  const subscribetomessage = () => {
    if (!socket) return;

    socket.on("newMessage", async (newMessage) => {
      // If message is from the currently selected user, mark as seen
      if (selectedusers && newMessage.senderId === selectedusers._id) {
        newMessage.seen = true;
        setmessages((prev) => [...prev, newMessage]);
        await axios.put(`/api/messages/mark/${newMessage._id}`);
      } else {
        // If from another user, increase unseen message count
        setunseenmessages((prev) => ({
          ...prev,
          [newMessage.senderId]: prev[newMessage.senderId]
            ? prev[newMessage.senderId] + 1
            : 1,
        }));
      }
    });
  };


  //unsubscribe messages

  const unsubscribemessages=async()=>{
    if(socket)socket.off("newMessage")
  }

  // Subscribe to new messages whenever socket or selected user changes
  useEffect(() => {
    subscribetomessage();
    return()=>unsubscribemessages()
  }, [socket, selectedusers]);

  // Values provided to context consumers
  const value = {
    users,
    messages,
    unseenmessages,
    selectedusers,
    setselectedusers,
    setunseenmessages,
    unsubscribemessages,
    getusers,
    getmessage,
    sendmessage,
  };

  // Provide chat context to children
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
