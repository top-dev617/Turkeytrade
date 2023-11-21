const mongoose = require("mongoose");
const Notification = require("./notification.model");
const Store = require("../../store/store.model");

// Ensure indexes for the "notifications" collection
Notification.createIndexes([
  { receiverId: 1 },
  { senderId: 1 },
  { createdAt: -1 },
]);

const createNotification = async (req, res) => {
  try {
    const newNotification = new Notification(req.body);
    const result = await newNotification.save();
    res.status(200).json({
      status: true,
      message: "Notification Create Success",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Notification Create Failed",
      errorMessage: error.message,
    });
  }
};

const getMyNotifications = async (req, res) => {
  try {
    const isStore = await Store.findOne({
      user: req.user._id,
      status: "accept",
    }).select("_id");
    const storeId = isStore?._id.toString();
    const notifications = await Notification.aggregate([
      {
        $match: {
          $or: [{ receiverId: storeId }, { receiverId: req.user?._id }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 25,
      },
      {
        $group: {
          _id: null,
          notifications: {
            $push: {
              _id: "$_id",
              title: "$title",
              chatId: "$chatId",
              sender_type: "$sender_type",
              senderInfo: "$senderInfo",
              senderId: "$senderId",
              receiverId: "$receiverId",
              seen: "$seen",
              createdAt: "$createdAt",
              updatedAt: "$updatedAt",
            },
          },
          totalUnseen: {
            $sum: {
              $ifNull: [
                {
                  $cond: {
                    if: { $eq: ["$seen", false] },
                    then: 1,
                    else: 0,
                  },
                },
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          notifications: 1,
          totalUnseen: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Notifications Retrieve Successful",
      data: notifications?.length > 0 ? notifications[0] : null,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Notifications Retrieve failed",
    });
  }
};

const updateSeenNotifications = async (req, res) => {
  try {
    console.log(req.user);
    const isStore = await Store.findOne({ user: req.user._id }).select("_id");
    const result = await Notification.updateMany(
      {
        $and: [
          { seen: false },
          {
            $or: [
              {
                receiverId: isStore._id.toString(),
              },
              {
                receiverId: req.user._id,
              },
            ],
          },
        ],
      },
      { $set: { seen: true } }
    );
    res.status(200).json({
      status: true,
      message: "Message Seen successful",
      data: result,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: "Message Seen failed",
    });
  }
};

module.exports = {
  createNotification,
  getMyNotifications,
  updateSeenNotifications,
};
