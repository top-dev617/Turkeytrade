const HelpCenterMessage = require("./helpCenterMessage.model");

const createHelpCenterMessage = async (req, res) => {
  const { senderId, chatId, text, images, attachment } = req.body;
  try {
    const newMessage = new HelpCenterMessage({
      chatId,
      senderId,
      text,
      images,
      attachment,
    });
    const result = await newMessage.save();
    res.status(200).json({
      success: true,
      message: "Send New Message",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getHelpCenterMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await HelpCenterMessage.find({ chatId: chatId });
    res.status(200).json({
      success: true,
      message: "Send New Message",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createHelpCenterMessage,
  getHelpCenterMessagesByChatId,
};
