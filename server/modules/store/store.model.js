const { Schema, model } = require("mongoose");

const storeSchema = new Schema(
  {
    store_name: {
      type: String,
      required: true,
    },

    company_address: {
      type: Object,
      country: {
        type: String,
        required: true
      },
      province: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      postal_code: {
        type: String,
        required: true
      },
    },
    business_information: {
      type: Object,
      business_registration_certificate: {
        type: String,
        required: true
      },
      business_certificate_number: {
        type: String,
        required: true
      },
      company_website: {
        type: String,
        required: true
      },
    },
    tax_information: {
      type: Object,
      kdv_number: {
        type: String,
        required: true
      },
      kdv_certificate: {
        type: String,
        required: true
      }
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    logo: {
      type: String,
      required: false,
    },
    store_presentation_video: {
      type: String,
      required: false,
    },
    store_info: {
      type: String,
      required: false,
    },
    certificates: {
      type: [String],
      required: false,
    },
    status: {
      type: String,
      enum: ["accept", "pending"],
      default: "pending",
    },
    joined_date: {
      type: Date,
      required: false,
      default: Date.now,
    },
  },
  {
    timestamps: false,
  }
);

const Store = model("Store", storeSchema);

module.exports = Store;
