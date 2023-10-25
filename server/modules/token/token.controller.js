const Token = require("./token.model")
const bcrcypt = require("bcryptjs");

const saveToken = async (req, res) => {
    try {
        const newToken = new Token({
            token: req.body.token
        })
        const result = await newToken.save()
        res.status(201).json({
            status: true,
            message: "Token save Successful"
        })
    } catch (error) {
        res.status(201).json({
            status: false,
            message: error.message
        })
    }
}
const getToken = async (req, res) => {
    try {
        const result = await Token.find({})
        res.status(201).json({
            status: true,
            message: "Token save Successful",
            data: result
        })
    } catch (error) {
        res.status(201).json({
            status: false,
            message: "Token save Unsuccessful"
        })
    }
}


module.exports = {
    saveToken,
    getToken
}