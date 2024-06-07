import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const loadTask = createAsyncThunk('task/loadTask', async (taskId, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:5000/loadTask/${taskId}`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const createTask = createAsyncThunk(
  'task/addTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/addTask`, taskData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const deleteTask = createAsyncThunk(
  'task/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteTask/${taskId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const loadTasks = createAsyncThunk('task/loadTasks', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.post(`http://localhost:5000/loadTasks`)
    return response.data
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})

export const loadTasksByActivityId = createAsyncThunk(
  'task/loadTasksByActivityId',
  async (activityId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:5000/loadTasksByActivityId/${activityId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  },
)

export const updateTask = createAsyncThunk(
  'task/updateTask',
  async ({ taskId, taskData }, { rejectWithValue }) => {
    try {
      console.log('Updating task with ID:', taskId)
      console.log('Task data:', taskData)
      const response = await axios.put(`http://localhost:5000/updateTask/${taskId}`, taskData)
      console.log('Update response:', response.data)
      return response.data
    } catch (error) {
      console.error('Error updating task:', error.response.data)
      return rejectWithValue(error.response.data)
    }
  },
)

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    allTasks: [], // when loading all the tasks
    status: 'idle',
    error: null,
    tasksByActivityId: [],
    task: {}, // when dealing with a single task
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasks.fulfilled, (state, action) => {
        state.allTasks = action.payload
      })
      .addCase(loadTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.allTasks.push(action.payload)
        state.tasksByActivityId.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.allTasks = state.allTasks.filter((task) => task._id !== action.payload)
        console.log('Deleted task ID:', action.payload)
        state.tasksByActivityId = state.tasksByActivityId.filter(
          (task) => task._id !== action.payload,
        )
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log('Task updated successfully:', action.payload)
        state.task = action.payload
        state.status = 'succeeded'
        state.allTasks = state.allTasks.map((task) => {
          if (task._id === action.payload._id) {
            return action.payload
          }
          return task
        })
        state.tasksByActivityId = state.tasksByActivityId.map((task) => {
          if (task._id === action.payload._id) {
            return action.payload
          }
          return task
        })
      })
      .addCase(updateTask.rejected, (state, action) => {
        console.error('Task update failed:', action.error.message)
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(updateTask.pending, (state) => {
        console.log('Task update pending...')
        state.status = 'loading'
      })
      .addCase(loadTask.fulfilled, (state, action) => {
        state.task = action.payload
      })
      .addCase(loadTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadTask.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loadTasksByActivityId.fulfilled, (state, action) => {
        state.tasksByActivityId = action.payload
      })
      .addCase(loadTasksByActivityId.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(loadTasksByActivityId.pending, (state) => {
        state.status = 'loading'
      })
  },
})

export default taskSlice.reducer
