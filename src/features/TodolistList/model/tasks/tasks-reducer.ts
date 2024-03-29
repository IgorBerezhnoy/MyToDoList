import {clearDataAC, todolistAsyncActions} from '../todolists/todolistsSlice';
import {TasksStateType} from '../../ui/TodolistsList';
import {createSlice} from '@reduxjs/toolkit';
import {createAppAsyncThunk, handleServerAppError} from '../../../../common/utils';
import {appSetStatusAC} from '../../../Application';
import {thunkTryCatch} from '../../../../common/utils/thunkTryCatch';
import {getModel} from '../../ui/Todolist/Tasks/Task/selectors/selectors';
import {ResultCode, TaskPriorities, TaskStatuses} from '../../../../common/enums';
import {tasksApi, TaskType, todolistsApi, UpdateTaskModelType} from '../../../../common/api';

const initialState: TasksStateType = {};
const {removeTodolist, fetchTodolistsTC, addTodolist} = todolistAsyncActions;
const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state[action.payload.task.todoListId].unshift(action.payload.task);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state[action.payload.todolistId] = state[action.payload.todolistId]
          .filter(t => t.id != action.payload.taskId);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state[action.payload.todolistId] = state[action.payload.todolistId]
          .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t);
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(clearDataAC, (state, action) => {
        return {};
      })
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        action.payload.todolists.forEach(el => {
          state[el.id] = [];
        });
      });
  }
});


const fetchTask = createAppAsyncThunk<{ todolistId: string, tasks: TaskType[] }, string>
('tasks/fetchTask', async (todolistId, thunkAPI) => {
  let {dispatch} = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    let res = await tasksApi.getTasks(todolistId);
    dispatch(appSetStatusAC({status: 'succeeded'}));
    return {todolistId, tasks: res.data.items};
  });

});
const removeTask = createAppAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }>
('tasks/removeTask', async ({taskId, todolistId}, thunkAPI) => {
  let {dispatch, rejectWithValue} = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    let res = await tasksApi.deleteTask(todolistId, taskId);
    if (res.data.resultCode ===  ResultCode.Success) {
      dispatch(appSetStatusAC({status: 'succeeded'}));
      return {taskId, todolistId};
    } else {
      handleServerAppError(res.data, dispatch);
      dispatch(appSetStatusAC({status: 'succeeded'}));
      return rejectWithValue(null);
    }
  });
});
const addTask = createAppAsyncThunk<{ task: TaskType }, { title: string, todolistId: string }>
('tasks/addTaskTC', async ({title, todolistId}, thunkAPI) => {
  let {dispatch} = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    let res = await tasksApi.createTask(todolistId, title);
    if (res.data.resultCode ===  ResultCode.Success) {
      dispatch(appSetStatusAC({status: 'failed'}));
      return {task: res.data.data.item};
    } else {
      handleServerAppError(res.data, dispatch, false);
      return thunkAPI.rejectWithValue(res.data);
    }
  });
});


export const updateTask = createAppAsyncThunk<{ taskId: string, model: UpdateTaskModelDomainType, todolistId: string }, { taskId: string, domainModel: UpdateTaskModelDomainType, todolistId: string }>
('tasks/updateTaskTC', async ({taskId, todolistId, domainModel}, thunkAPI) => {
  let {dispatch, rejectWithValue, getState} = thunkAPI;
  const state = getState();
  const task = state.tasks[todolistId].find((t) => t.id === taskId);
  if (!task) {
    console.warn('task not found in the state');
    return rejectWithValue(null);
  }
  const apiModel: UpdateTaskModelType = getModel(task, domainModel);
  return thunkTryCatch(thunkAPI, async () => {
    let res = await tasksApi.updateTask(todolistId, taskId, apiModel);
    if (res.data.resultCode ===  ResultCode.Success) {
      console.log({taskId, model: domainModel, todolistId});
      return {taskId, model: domainModel, todolistId};
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

export const taskAsyncActions = {
  fetchTask, removeTask, addTask, updateTask
};
export const tasksReducer = slice.reducer;
export type UpdateTaskModelDomainType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
