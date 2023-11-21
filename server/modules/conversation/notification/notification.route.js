const express = require("express");
const {
  createNotification,
  getMyNotifications,
  updateSeenNotifications,
} = require("./notification.controller");
const { isAuth } = require("../../../utils/middleware");
const router = express.Router();

router.post("/", isAuth, createNotification);
router.get("/my-all", isAuth, getMyNotifications);
router.patch("/seen/all", isAuth, updateSeenNotifications);

module.exports = router;
