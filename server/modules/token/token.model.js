const { Schema, model } = require("mongoose");

const tokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: false,
    }
);

const Token = model("Token", tokenSchema);

module.exports = Token;
