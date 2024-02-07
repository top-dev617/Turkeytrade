const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const path = require("path");

// helpers
const helperRoutes = require("./modules/helper/helper.route");

const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./modules/store/store.route");
const categoryRoutes = require("./modules/category/category.route");
const subCategoryRoutes = require("./modules/subCategory/subCategory.route");
const productRoutes = require("./modules/product/product.route");
const storeInfoRoutes = require("./modules/storeInfo/storeInfo.route");
const tokenRoutes = require("./modules/token/token.route");
const groupRoutes = require("./modules/productGroup/productGroup.route");
const saveProductRoutes = require("./modules/saveProduct/saveProductRoute");

// conversations
const chatRoutes = require("./modules/conversation/chat/chat.route");
const messageRoutes = require("./modules/conversation/message/message.route");
const notificationRoutes = require("./modules/conversation/notification/notification.route");

// conversations
const helpCenterChatRoutes = require("./modules/help-center/help-center-chat/helpCenterChat.route");
// const messageRoutes = require("./modules/conversation/message/message.route");

const app = express();
const http = require("http");
const Server = http.createServer(app);
const socketIo = require("socket.io");

// middleware
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(
  express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 })
);

connectDB();

// helpers
app.use("/api/v2/helpers", helperRoutes);

// routes
app.use("/api/v2/users", userRoutes);
app.use("/api/v2/stores", storeRoutes);
app.use("/api/v2/categories", categoryRoutes);
app.use("/api/v2/sub-categories", subCategoryRoutes);
app.use("/api/v2/products", productRoutes);
app.use("/api/v2/store-info", storeInfoRoutes);
app.use("/api/v2/token", tokenRoutes);
app.use("/api/v2/product-groups", groupRoutes);
app.use("/api/v2/save-products", saveProductRoutes);

// static file serving
app.use("/api/v2/uploads", express.static(path.join(__dirname, "/")));

// conversation
app.use("/api/v2/chats/", chatRoutes);
app.use("/api/v2/messages/", messageRoutes);
app.use("/api/v2/notifications", notificationRoutes);

// Help Center
app.use("/api/v2/help-center/", helpCenterChatRoutes);
// app.use("/api/v2/messages/", messageRoutes);

// -----------------socket server-----------------
const io = socketIo(Server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

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

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getUsers = (userId, senderId) => {
  return users.filter(
    (user) => user.userId === userId || user?.userId === senderId
  );
};

io.on("connection", (socket) => {
  console.log("connected. 🟢");

  //take userId and socketId from user
  socket.on("addUser", (user) => {
    addUser(user, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message

  socket.on(
    "sendMessage",
    ({
      senderId,
      receiverId,
      chatId,
      message,
      images,
      video,
      document,
      createdAt,
    }) => {
      const currentUsers = getUsers(receiverId, senderId);
      for (let i = 0; i < currentUsers?.length; i++) {
        io.to(currentUsers[i]?.socketId).emit("getMessage", {
          senderId,
          receiverId,
          chatId,
          message,
          images,
          video,
          document,
          createdAt,
          members: [receiverId, senderId],
        });
      }
    }
  );

  //when disconnect
  socket.on("disconnect", () => {
    console.log("disconnected! 🔴");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// -----------------socket server-----------------

// testing api
app.get("/", (req, res) => {
  res.send("Server is running");
});

Server.listen(PORT, () => {
  console.log(`Server is Running PORT: ${PORT}`);
});
