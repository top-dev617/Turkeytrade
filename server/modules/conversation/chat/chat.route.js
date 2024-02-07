const express = require("express");
const {
  createChat,
  findChat,
  getInfoByMemberType,
  getGlobalChats,
  toggleNotificationSound,
  inboxChats,
} = require("./chat.controller");
const { isAuth } = require("../../../utils/middleware");
const router = express.Router();

router.post("/", createChat);
router.get("/inbox", isAuth, inboxChats);
router.get("/global", isAuth, getGlobalChats);
router.get("/find/:firstId/:secondId", findChat);
router.get("/info/:type/:memberId", getInfoByMemberType);

router.patch("/toggle-alert/:chatId", isAuth, toggleNotificationSound);

module.exports = router;
