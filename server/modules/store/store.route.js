const express = require("express");
const { isAuth } = require("../../utils/middleware");
const {
  createStore,
  getStoreById,
  updateStore,
  getStoreByUserId,
  getStoreCategoriesByStore,
} = require("./store.controller");

const router = express.Router();

router.post("/", createStore);
router.get("/:id", getStoreById);
router.get("/user/:userId", getStoreByUserId);
router.patch("/:id", updateStore);
router.get("/store/:storeId/categories", getStoreCategoriesByStore);

module.exports = router;
