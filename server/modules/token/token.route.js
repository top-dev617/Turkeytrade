const express = require("express");
const { saveToken, getToken } = require("./token.controller");

const router = express.Router();

router.post("/", saveToken)
router.get("/", getToken)

module.exports = router;
