const socketIo = require("socket.io");
require("dotenv").config();
const {
  updateLastActivity,
} = require("../../modules/conversation/chat/chat.service");

let users = [];

const addUser = (userInfo, socketId) => {
  !users.some(
    (user) => user.userId === userInfo.id && user?.type === userInfo?.type
  ) &&
    users.push({
      userId: userInfo?.id,
      type: userInfo?.type,
      socketId: socketId,
    });
};

const getSocketUser = async (userId) => {
  return await users.find((user) => user.userId === userId);
};

const getUserBySocketId = async (socketId) => {
  return await users.find((user) => user.socketId === socketId);
};

const removeUser = async (socketId) => {
  const user = await getUserBySocketId(socketId);
  users = await users.filter((user) => user.socketId !== socketId);
  return user;
};

const getUsers = async (userId) => {
  return await users.filter((user) => user.userId === userId);
};

let io;
const initializeSocket = (Server) => {
  io = socketIo(Server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    // console.log("connected. 🟢");

    //take userId and socketId from user
    socket.on("addUser", (user) => {
      addUser(user, socket.id);
      console.log("🟢 Connected total: ", users?.length, "  ", "user: ", user);
      io.emit("getUsers", users);
    });

    socket.on("addChat", async (chat) => {
      const user = await getSocketUser(chat?.rcId);
      io.to(user?.socketId).emit("getChat", chat);
    });

    //send and get message

    socket.on("sendMessage", async (newMessage) => {
      const currentUsers = await getUsers(newMessage?.receiverId);
      console.log("users", currentUsers);
      for (let i = 0; i < currentUsers.length; i++) {
        io.to(currentUsers[i]?.socketId).emit("getMessage", newMessage);
      }
    });

    //when disconnect
    socket.on("disconnect", async () => {
      const user = await removeUser(socket.id);
      io.emit("getUsers", users);
      if (user?.userId) {
        const timestamp = Date.now(); // Get the current timestamp in milliseconds
        const time = new Date(timestamp);
        updateLastActivity(user?.userId, time.toISOString());
        io.emit("last-activity", {
          id: user?.userId,
          time: time.toISOString(),
        });
      }
      console.log("disconnected! 🔴");
    });
  });

  return io;
};

const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initializeSocket, getIo, getSocketUser };
// -----------------socket server-----------------
