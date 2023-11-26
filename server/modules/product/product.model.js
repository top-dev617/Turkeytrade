const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
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
      required: false,
    },
    price: {
      type: Object,
      price_type: {
        type: String,
        enum: ["ladder_price", "one_price"],
      },
      ladder_price: {
        type: [Object],
        quantity: {
          from: {
            type: String,
            required: false,
          },
          to: {
            type: String,
            required: false,
          },
        },
        euro: {
          type: String,
          required: false,
        },
      },
      one_price: {
        type: Object,
        from: {
          type: String,
          required: false,
        },
        to: {
          type: String,
          required: false,
        },
      },
      required: false,
    },
    category: {
      type: String,
      ref: "Category",
      required: false,
    },
    sub_category: {
      type: String,
      ref: "SubCategory",
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    features: {
      type: [String],
      required: false,
    },

    keyword: {
      type: [String],
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    group: {
      type: String,
      ref: "ProductGroup",
      required: false,
    },
    unit: {
      type: Object,
      singular: String,
      plural: String,
      required: false,
    },
    moq: {
      type: String,
      required: false,
    },
    lead_time: {
      type: Object,
      from: {
        type: String,
        required: false,
      },
      to: {
        type: String,
        required: false,
      },
      time: {
        type: String,
        required: false,
      },
      required: false,
    },
    video: {
      type: String,
      required: false,
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
