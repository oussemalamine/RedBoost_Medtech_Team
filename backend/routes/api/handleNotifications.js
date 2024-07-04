const express = require("express");
const router = express.Router();
const Notification = require("../../database/models/NotifcationSchema");
const User = require("../../database/models/AdminSchema");

// Create a notification
router.post("/createNotification", async (req, res) => {
  try {
    const { userId, taskId, title, text, actionUserId } = req.body;

    // Fetch the user who performed the action
    const actionUser = await User.findById(actionUserId);

    if (!actionUser) {
      return res.status(404).json({ error: "Action user not found" });
    }

    const actionUserAvatarUrl = actionUser.image?.data
      ? `data:${actionUser.image.contentType};base64,${actionUser.image.data.toString('base64')}`
      : ""; // Convert image data to base64 URL if available

    const newNotification = new Notification({
      userId,
      title,
      text,
      taskId,
      actionUserAvatarUrl,
    });

    const savedNotification = await newNotification.save();

    res.status(201).json(savedNotification);
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all notifications for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId })
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Mark a notification as read
router.put("/:notificationId", async (req, res) => {
  try {
    const { notificationId } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a notification
router.delete("/:notificationId", async (req, res) => {
  try {
    const { notificationId } = req.params;

    const deletedNotification = await Notification.findByIdAndDelete(notificationId);

    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;