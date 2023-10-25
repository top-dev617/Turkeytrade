const Message = require("./message.model");


const createMessage = async (req, res) => {
    try {
        const newMessage = new Message(req.body)
        const result = await newMessage.save()
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
};


const getMessages = async (req, res) => {
    const { chatId } = req.params
    try {
        const result = await Message.find({ chatId }).populate("product")
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createMessage,
    getMessages,
}