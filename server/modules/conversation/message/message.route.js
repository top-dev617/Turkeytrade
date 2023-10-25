const express = require('express');
const { createMessage, getMessages } = require('./message.controller');
const router = express.Router();


router.post('/', createMessage);
router.get('/:chatId', getMessages);

module.exports = router