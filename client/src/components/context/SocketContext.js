import { io } from "socket.io-client";
import { socket_url } from "@/utils/auth/global";
import React, { createContext } from "react";

export const SocketContext = createContext();

export const socket = io.connect(socket_url, {
  credentials: true,
});
const SocketProvider = ({ children }) => {
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
