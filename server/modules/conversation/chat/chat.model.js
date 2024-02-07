const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    settings: {
      type: Object,
      sender: {
        type: Object,
        isMute: {
          type: Boolean,
          required: false,
        },
        last_active: {
          type: Date,
          required: false,
        },
        required: false,
      },
      receiver: {
        type: Object,
        isMute: {
          type: Boolean,
          required: false,
        },
        last_active: {
          type: Date,
          required: false,
        },
        required: false,
      },
      default: {
        sender: { isMute: false },
        receiver: { isMute: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
