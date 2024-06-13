const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const path = require("path");
require("dotenv").config();

// helpers
const helperRoutes = require("./modules/helper/helper.route");

const userRoutes = require("./routes/userRoutes");
const storeRoutes = require("./modules/store/store.route");
const categoryRoutes = require("./modules/category/category.route");
const subCategoryRoutes = require("./modules/subCategory/subCategory.route");
const productRoutes = require("./modules/product/product.route");
const storeInfoRoutes = require("./modules/storeInfo/storeInfo.route");
const groupRoutes = require("./modules/productGroup/productGroup.route");
const saveProductRoutes = require("./modules/saveProduct/saveProductRoute");

// conversations
const chatRoutes = require("./modules/conversation/chat/chat.route");
const messageRoutes = require("./modules/conversation/message/message.route");
const notificationRoutes = require("./modules/conversation/notification/notification.route");

// conversations
const helpCenterChatRoutes = require("./modules/help-center/help-center-chat/helpCenterChat.route");

const app = express();
const http = require("http");
const { initializeSocket } = require("./config/socket/socketServer");
const Server = http.createServer(app);

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
app.use("/api/v2/product-groups", groupRoutes);
app.use("/api/v2/save-products", saveProductRoutes);

// static file serving
app.use("/api/v2/uploads", express.static(path.join(__dirname, "/")));
app.use(
  "/api/v2/notification",
  express.static(path.join(__dirname, "/assets/audio/notification.mp3"))
);

// conversation
app.use("/api/v2/chats/", chatRoutes);
app.use("/api/v2/messages/", messageRoutes);
app.use("/api/v2/notifications", notificationRoutes);

// Help Center
app.use("/api/v2/help-center/", helpCenterChatRoutes);

// Initialize Socket.IO
initializeSocket(Server);

// testing api
app.get("/", (req, res) => {
  res.send("Server is running");
});

Server.listen(PORT, () => {
  console.log(`Server is Running PORT: ${PORT}`);
});
