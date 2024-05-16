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
      minPrice: {
        type: Number,
        required: false,
      }, // Add minPrice field
      maxPrice: {
        type: Number,
        required: false,
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

productSchema.pre("save", function (next) {
  if (
    this.price?.price_type === "ladder_price" &&
    Array.isArray(this.price.ladder_price)
  ) {
    const prices = this.price.ladder_price.map((price) => price.euro);
    this.price["minPrice"] = Math.min(...prices);
    this.price["maxPrice"] = Math.max(...prices);
  } else {
    this.price["minPrice"] = null;
    this.price["maxPrice"] = null;
  }
  next();
});

// Pre-findOneAndUpdate middleware to calculate minPrice and maxPrice
productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (
    update.price?.price_type === "ladder_price" &&
    Array.isArray(update.price.ladder_price)
  ) {
    const prices = update.price.ladder_price.map((price) => price.euro);
    update.price["minPrice"] = Math.min(...prices);
    update.price["maxPrice"] = Math.max(...prices);
  } else {
    update.price["minPrice"] = null;
    update.price["maxPrice"] = null;
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
