const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        memberOne: {
            type: Object,
            member_type: {
                type: String,
                enum: ["Store", "User"]
            },
            id: String,
        },
        memberTwo: {
            type: Object,
            member_type: {
                type: String,
                enum: ["Store", "User"]
            },
            id: String,
        },
    },
    {
        timestamps: true,
    }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
