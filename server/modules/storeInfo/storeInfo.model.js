const mongoose = require("mongoose");

const storeInfoSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    telephone_No: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
    social_media: [
      {
        name: {
          type: Object,
          required: true,
        },
        username: {
          type: Object,
          required: true,
        },
        address: {
          type: Object,
          required: true,
        },
      },
    ],
    store: {
      type: String,
      ref: "Store",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StoreInfo = mongoose.model("StoreInfo", storeInfoSchema);

module.exports = StoreInfo;
