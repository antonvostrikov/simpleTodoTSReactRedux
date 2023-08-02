import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { RootState } from "../store";

type Task = {
  id: number
  title: string
  completed: boolean
}

type Tasks = {
  tasks: Task[]
}

const initialState: Tasks = {
  tasks: []
}

export const getTasks = createAsyncThunk<Task[]>(
  'tasks/getTasks',
  async () => {
    const response = await axios.get('http://localhost:3001/tasks')

    return response.data
  }
)

export const addTasks = createAsyncThunk<Task, string, { rejectValue: string }>(
  'tasks/addTasks',
  async (title, { rejectWithValue }) => {
    
    const newTask = {
      title: title, 
      completed: false
    }

    const response = await axios.post('http://localhost:3001/tasks', newTask)

    if (!response) {
      return rejectWithValue('Some error')
    }

    return response.data
  }
)

export const deleteTask = createAsyncThunk<number, number, { rejectValue: string }>(
  'tasks/deleteTasks', 
  async (id, { rejectWithValue }) => {
    const response = await axios.delete(`http://localhost:3001/tasks/${id}`)
  
    if (!response) {
      return rejectWithValue('Some error')
    }

    return id
  }
)

export const toggleStatusTask = createAsyncThunk<Task, number, { rejectValue: string, state: RootState }>(
  'tasks/toggleStatus',
  async (id, { rejectWithValue, getState }) => {
    const findTask = getState().tasks.tasks.find(task => task.id === id)

    if (findTask) {
      const response = await axios.put(`http://localhost:3001/tasks/${id}`, { completed: !findTask.completed })

      if (!response) {
        rejectWithValue('Some error')
      }

      return response.data
    }
  }
)

const taskSlice = createSlice({
  initialState,
  name: 'tasks',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload
    })
    builder.addCase(getTasks.pending, (state) => {
      state.tasks = []
    })
    builder.addCase(getTasks.rejected, (state) => {
      state.tasks = []
    })
    builder.addCase(addTasks.fulfilled, (state, action) => {
      state.tasks.push(action.payload)
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(tasks => tasks.id !== action.payload)
    })
    builder.addCase(toggleStatusTask.fulfilled, (state, action) => {
      const findTask = state.tasks.find(task => task.id === action.payload.id)

      if (findTask) {
        findTask.completed = !findTask.completed
      }
    })
  }
})

export default taskSlice.reducer