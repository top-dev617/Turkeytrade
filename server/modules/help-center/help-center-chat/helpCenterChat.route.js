const express = require("express");
const { createHelpCenterChat } = require("./helpCenterChat.controller");
const router = express.Router();

router.post("/", createHelpCenterChat);
// router.get('/:userId', userChats);
// router.get('/find/:firstId/:secondId', findChat);
// router.get('/info/:type/:memberId', getInfoByMemberType);

module.exports = router;
