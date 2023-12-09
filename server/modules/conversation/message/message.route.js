const express = require("express");
const { createMessage, getMessages } = require("./message.controller");
const { upload, handleMulterError } = require("../../../config/multerConfig");
const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "images", maxCount: 8 }]),
  handleMulterError,
  createMessage
);
router.get("/:chatId", getMessages);

module.exports = router;
