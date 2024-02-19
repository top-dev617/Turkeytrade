import { io } from "socket.io-client";
import { socket_url } from "@/utils/auth/global";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  setChatUnseen,
  setInboxChatUnseen,
  setInboxLastMessages,
  setInboxMessagePush,
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
  // const [id,setId]=useState("")

  // useEffect(() => {
  //   const uuid = () => {
  //     let dt = new Date().getTime();
  //     return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
  //       /[xy]/g,
  //       function (c) {
  //         let r = (dt + Math.random() * 16) % 16 | 0;
  //         dt = Math.floor(dt / 16);
  //         return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  //       }
  //     );
  //   };
  //   if (!window.name) {
  //     window.name = uuid();
  //   }
  //   setTabId(window.name);
  // }, []);

  useEffect(() => {
    socket.current = io(socket_url, {
      credentials: true,
    });

    setInterval(() => {
      if (user) {
        socket.current.emit("addUser", { id: user?._id, type: "Global" });
      }
    }, 5000);

    socket.current.on("getUsers", (users) => {
      dispatch(setOnline_users(users));
    });

    socket.current.on("getMessage", (receiveMessage) => {
      refetch();
      dispatch(setNtfAlert({ ...receiveMessage, userId: user?._id }));
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
