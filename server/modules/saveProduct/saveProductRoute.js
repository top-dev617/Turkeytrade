const express = require("express");
const {
  createSaveProduct,
  getSaveProducts,
  removeSaveProductById,
  getSaveProduct,
} = require("./saveProduct.controller");
const { isAuth } = require("../../utils/middleware");
const router = express.Router();

// create new save product
router.post("/", isAuth, createSaveProduct);

// get all save products by user
router.get("/", isAuth, getSaveProducts);

router.get("/single/:id", isAuth, getSaveProduct);
// delete save product by user id and id
router.delete("/:id", isAuth, removeSaveProductById);

module.exports = router;
