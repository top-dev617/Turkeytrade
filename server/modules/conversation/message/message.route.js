const express = require("express");
const {
  createMessage,
  getMessages,
  getTotalUnseen,
  seenAllUnseenMessages,
} = require("./message.controller");
const { upload, handleMulterError } = require("../../../config/multerConfig");
const { isAuth } = require("../../../utils/middleware");
const router = express.Router();

router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 4 },
    { name: "video", maxCount: 1 },
    { name: "document", maxCount: 1 },
  ]),
  handleMulterError,
  createMessage
);
router.get("/:chatId", getMessages);
router.get("/total-unseen/counts", isAuth, getTotalUnseen);
router.patch("/unseen-to-seen/:chatId", isAuth, seenAllUnseenMessages);

module.exports = router;
