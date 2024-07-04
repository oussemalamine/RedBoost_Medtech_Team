const express = require("express");
const router = express.Router();
const Task = require("../../database/models/TaskSchema");
const Notification = require("../../database/models/NotifcationSchema");
const Activity = require("../../database/models/ActivitySchema");
const NotificationTemplates = require("../../database/models/NotificationTemplates");
const wss = require("../../websocket");

// Middleware to parse request body
router.use(express.json());

// Route to add a task
router.post("/addTask", async (req, res) => {
  try {
    const { activityId, taskOwner, ...taskData } = req.body;

    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    const newTask = new Task({ ...taskData, activityId, taskOwner });
    const savedTask = await newTask.save();

    const newNotification = new Notification({
      userId: taskOwner,
      taskId: savedTask._id,
      title: NotificationTemplates.taskAssigned.title(savedTask.taskName),
      text: NotificationTemplates.taskAssigned.text(savedTask.taskName, savedTask.endDate),
    });
    const savedNotification = await newNotification.save();

    // Convert the notification to a plain object before broadcasting
    wss.broadcast(savedNotification.toObject());

    await Activity.findByIdAndUpdate(
      activityId,
      { $push: { tasks: savedTask._id } },
      { new: true, useFindAndModify: false }
    );

    res.status(200).json(savedTask);
  } catch (error) {
    console.error("Failed to create task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Route to update a task
router.put("/updateTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const updatedTaskData = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    if (updatedTaskData.status && updatedTaskData.status !== task.status) {
      task.status = updatedTaskData.status;
      await task.save();

      const newNotification = new Notification({
        userId: task.taskOwner,
        taskId: task._id,
        title: NotificationTemplates.taskStatusChanged[updatedTaskData.status].title(task.taskName),
        text: NotificationTemplates.taskStatusChanged[updatedTaskData.status].text(task.taskName),
      });
      await newNotification.save();

      wss.broadcast(newNotification);

      res.status(200).json(task);
    } else {
      const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
      res.status(200).json(updatedTask);
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Route to load all tasks
router.post("/loadTasks", async (req, res) => {
  try {
    // Fetch tasks from the database
    const tasks = await Task.find();

    if (!tasks) {
      return res.status(404).json({ error: "Tasks not found" });
    }

    // Respond with the tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error loading tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route to load a task by ID
router.post("/loadTaskById", async (req, res) => {
  try {
    const { taskId } = req.body; // Extract taskId from request body

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    // Find the Task by its ID
    const task = await Task.findById(taskId);

    // Check if task is found
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Return success response with task data
    res.status(200).json(task);
  } catch (error) {
    console.error("Error loading task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//Route to load tasks by activity id
router.post("/loadTasksByActivityId/:activityId", async (req, res) => {
  try {
    const { activityId } = req.params;
    // Find the Task by its ID
    const tasks = await Task.find({ activityId });

    // Check if task is found
    if (!tasks) {
      return res.status(404).json({ error: "Tasks not found" });
    }

    // Return success response
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error loading tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete a task
router.delete("/deleteTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the activity associated with the task
    const activity = await Activity.findById(task.activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await activity.tasks.pull(taskId);
    await activity.save();

    res.status(200).json(taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to load tasks by user ID
router.post("/tasksByUser", async (req, res) => {
  try {
    const { userId } = req.body; // Retrieve userId from request body

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await Task.find({ taskOwner: userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found for this user" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error loading tasks by user ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
