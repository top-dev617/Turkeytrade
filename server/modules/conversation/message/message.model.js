const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    members: {
      type: [String],
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    video: {
      type: String,
      required: false,
    },
    document: {
      type: String,
      required: false,
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product",
      required: false,
    },
    isSeen: {
      type: Boolean,
      enum: [true, false],
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
