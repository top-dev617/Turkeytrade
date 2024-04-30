import { io } from "socket.io-client";
import { socket_url } from "@/utils/auth/global";
import React, { createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {
  setChatUnseen,
  setInboxChatUnseen,
  setInboxMessagePush,
  setLastActivity,
  setLastMessages,
  setMessagePush,
  setNewChat,
  setNtfAlert,
  setOnline_users,
} from "@/redux/features/conversation/conversationSlice";
import { useDispatch } from "react-redux";
import { useTotalUnseenQuery } from "@/redux/features/conversation/conversationApi";

export const SocketContext = createContext();

export const socket = io.connect(socket_url, {
  credentials: true,
});
const SocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch();
  const { refetch } = useTotalUnseenQuery();

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      return {
        status: true,
        message: "The browser window is currently open and visible.",
      };
    } else if (document.visibilityState === "hidden") {
      return {
        status: false,
        message: "The browser window is currently minimized and not visible.",
      };
    }
  };

  const sendNotification = (message = "...") => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("New Message", {
        body: message,
        icon: "https://static.vecteezy.com/system/resources/previews/014/441/089/original/chat-message-icon-design-in-blue-circle-png.png",
      });
    }
  };

  const handleNtf = (message) => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
          sendNotification(message);
        }
      });
    } else {
      sendNotification(message);
    }
  };

  const makePermit = async () => {
    await Notification.requestPermission();
  };

  useEffect(() => {
    makePermit();
  }, []);

  useEffect(() => {
    socket.current = io.connect(socket_url, {
      credentials: true,
    });

    setInterval(() => {
      if (user && user._id) {
        socket.current.emit("addUser", { id: user?._id, type: "Global" });
      }
    }, 5000);

    socket.current.on("getUsers", (users) => {
      dispatch(setOnline_users(users));
    });
    socket.current.on("last-activity", (user) => {
      dispatch(setLastActivity(user));
    });

    socket.current.on("getMessage", (receiveMessage) => {
      // console.log("receiveMessage: ", receiveMessage);
      refetch();
      dispatch(setNtfAlert({ ...receiveMessage, userId: user?._id }));
      const isVisible = handleVisibilityChange();
      if (isVisible?.status === false) {
        handleNtf(receiveMessage?.message);
      }
      dispatch(setChatUnseen({ ...receiveMessage, userId: user?._id }));
      dispatch(setInboxChatUnseen({ ...receiveMessage, userId: user?._id }));
      dispatch(setMessagePush(receiveMessage));
      dispatch(setInboxMessagePush(receiveMessage));
      dispatch(setLastMessages(receiveMessage));
      // dispatch(setInboxLastMessages(receiveMessage));
      // setLastChat();
    });

    socket.current.on("getChat", (receiveChat) => {
      dispatch(setNewChat(receiveChat));
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user]);

  const contextValue = {
    socket,
  };
  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
