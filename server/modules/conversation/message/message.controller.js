const Notification = require("../notification/notification.model");
const Message = require("./message.model");

const createMessage = async (req, res) => {
  try {
    const { sender_type, ...other } = req.body;
    const newNotification = new Notification({
      title: `New Message`,
      chatId: req.body.chatId,
      sender_type: sender_type,
      receiverId: req.body.members[0],
      senderId: req.body.members[1],
      seen: false,
    });
    const newMessage = new Message(other);
    const result = await newMessage.save();
    const nftResult = await newNotification.save();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Ensure indexes for the "notifications" collection
Message.createIndexes([{ chatId: 1 }, { senderId: 1 }]);

const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId }).populate("product");
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
};
