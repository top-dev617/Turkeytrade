const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;

const http = require("http");
const socketIo = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./modules/store/store.route");
const categoryRoutes = require("./modules/category/category.route");
const productRoutes = require("./modules/product/product.route");
const storeInfoRoutes = require("./modules/storeInfo/storeInfo.route");
const tokenRoutes = require("./modules/token/token.route");
const groupRoutes = require("./modules/productGroup/productGroup.route");

// conversations
const chatRoutes = require("./modules/conversation/chat/chat.route");
const messageRoutes = require("./modules/conversation/message/message.route");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

connectDB();

// routes
app.use("/api/v2/users", userRoutes);
app.use("/api/v2/stores", storeRoutes);
app.use("/api/v2/categories", categoryRoutes);
app.use("/api/v2/products", productRoutes);
app.use("/api/v2/store-info", storeInfoRoutes);
app.use("/api/v2/token", tokenRoutes);
app.use("/api/v2/product-groups", groupRoutes);

// conversation
app.use("/api/v2/chats/", chatRoutes);
app.use("/api/v2/messages/", messageRoutes);

const server = http.createServer(app);
const io = socketIo(server);

// Store user-specific messages
const userMessages = {};

io.on("connection", (socket) => {
  socket.on("join", (userId) => {
    socket.join(userId);

    // Check if there are messages for this user
    const messages = userMessages[userId] || [];
    messages.forEach((message) => {
      socket.emit("message", { from: message.from, message: message.message });
    });
    delete userMessages[userId];
  });

  socket.on("message", ({ to, message }) => {
    if (!userMessages[to]) {
      userMessages[to] = [];
    }
    userMessages[to].push({ from: socket.id, message });

    // Check if the recipient is online
    const recipientSocketId = io.sockets.adapter.rooms.get(to);
    if (recipientSocketId) {
      io.to(to).emit("message", { from: socket.id, message });
    }
  });

  socket.on("disconnect", () => {
    const rooms = Array.from(socket.rooms);
    rooms.forEach((room) => {
      socket.leave(room);
    });
  });
});

// testing api
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
