// socketEvents.js

const { getIo, getSocketUser } = require("./socketServer");

const storeSendUpdateToSocket = async (userId, data) => {
  const io = getIo();
  const user = await getSocketUser(userId);
  if (user && io) {
    io.to(user?.socketId).emit("storeStatus", data);
  }
  return true;
};

module.exports = {
  storeSendUpdateToSocket,
};
