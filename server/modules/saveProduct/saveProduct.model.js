const { mongoose } = require("mongoose");

const saveProductSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    product: {
      type: String,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SaveProduct = mongoose.model("SaveProduct", saveProductSchema);
module.exports = SaveProduct;
