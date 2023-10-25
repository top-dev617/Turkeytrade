const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length <= 6;
        },
        message: "Images array cannot have more than 6 items.",
      },
    },
    store: {
      type: String,
      ref: "Store",
      required: true,
    },
    price: {
      type: [Object],
      quantity: {
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
      },
      euro: {
        type: String,
        required: true,
      },
      required: true,
    },
    category: {
      type: String,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: false,
    },

    keyword: {
      type: [String],
      required: true,
    },
    model: {
      type: String,
      required: false,
    },
    group: {
      type: String,
      ref: "ProductGroup",
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    moq: {
      type: String,
      required: true,
    },
    lead_time: {
      type: Object,
      from: {
        type: String,
        required: true,
      },
      to: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      required: true,
    },
    status: {
      type: String,
      enum: ["Publish", "Draft"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
