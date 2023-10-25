const express = require('express');
const { createChat, userChats, findChat, getInfoByMemberType } = require('./chat.controller');
const router = express.Router();


router.post('/', createChat);
router.get('/:userId', userChats);
router.get('/find/:firstId/:secondId', findChat);
router.get('/info/:type/:memberId', getInfoByMemberType);

module.exports = router