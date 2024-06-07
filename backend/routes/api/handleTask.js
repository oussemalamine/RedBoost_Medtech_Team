const express = require('express')
const router = express.Router()
const Task = require('../../database/models/TaskSchema')
const Activity = require('../../database/models/ActivitySchema')

// Middleware to parse request body
router.use(express.json())

// Route to add a task
router.post('/addTask', async (req, res) => {
  try {
    // Validate incoming data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Invalid task data' })
    }

    const { activityId, ...taskData } = req.body

    // Find the activity by its ID
    const activity = await Activity.findById(activityId)
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }

    // Create a new task instance and link it to the activity
    const newTask = new Task({ ...taskData, activityId: activity._id })

    // Save task to the database
    const savedTask = await newTask.save()

    // Update the activity with the new task
    await Activity.findByIdAndUpdate(
      activityId,
      { $push: { tasks: savedTask._id } },
      { new: true, useFindAndModify: false },
    )

    // Respond with data
    res.status(200).json(savedTask)
  } catch (error) {
    // Handle errors
    console.error('Failed to create task:', error)
    res.status(500).json({ error: 'Failed to create task' })
  }
})

// Route to update a task
router.put('/updateTask/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params
    const taskData = req.body

    const task = await Task.findByIdAndUpdate(taskId, taskData, { new: true })
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    res.status(200).json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to load all tasks
router.post('/loadTasks', async (req, res) => {
  try {
    // Fetch tasks from the database
    const tasks = await Task.find()

    if (!tasks) {
      return res.status(404).json({ error: 'Tasks not found' })
    }

    // Respond with the tasks
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error loading tasks:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

//Route to load task by id
router.post('/loadTask/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params
    // Find the Task by its ID
    const task = await Task.findById(taskId)

    // Check if task is found
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    // Return success response
    res.status(200).json(task)
  } catch (error) {
    console.error('Error loading task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

//Route to load tasks by activity id
router.post('/loadTasksByActivityId/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params
    // Find the Task by its ID
    const tasks = await Task.find({ activityId })

    // Check if task is found
    if (!tasks) {
      return res.status(404).json({ error: 'Tasks not found' })
    }

    // Return success response
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error loading tasks:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to delete a task
router.delete('/deleteTask/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params
    const task = await Task.findByIdAndDelete(taskId)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    // Find the activity associated with the task
    const activity = await Activity.findById(task.activityId)
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }

    await activity.tasks.pull(taskId)
    await activity.save()

    res.status(200).json(taskId)
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
