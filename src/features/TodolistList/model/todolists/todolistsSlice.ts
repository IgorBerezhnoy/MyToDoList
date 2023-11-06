import {RequestStatusType} from '../../../../app/appSlice';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createAppAsyncThunk, handleServerAppError} from '../../../../common/utils';
import {appSetStatusAC} from '../../../Application';
import {todolistsApi, TodolistType} from '../../../../common/api';
import {thunkTryCatch} from '../../../../common/utils/thunkTryCatch';
import {ResultCode} from '../../../../common/enums';

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType,
  entityStatus: RequestStatusType
}

export const slice = createSlice({
  name: 'todolists',
  initialState: initialState,
  reducers: {
    changeTodolistFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
      let todolistIndex = state.findIndex(tl => tl.id === action.payload.todolistId);
      state[todolistIndex].filter = action.payload.filter;
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
      let todolistIndex = state.findIndex(tl => tl.id === action.payload.id);
      state[todolistIndex].entityStatus = action.payload.status;
    },

    clearDataAC() {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        let todolistIndex = state.findIndex(tl => tl.id === action.payload.id);
        state[todolistIndex].title = action.payload.title;
      })
      .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
        return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({
          id: action.payload.todolist.id,
          title: action.payload.todolist.title,
          filter: 'all',
          addedDate: action.payload.todolist.addedDate,
          order: action.payload.todolist.order, entityStatus: 'idle'
        });
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        let todolistIndex = state.findIndex(tl => tl.id === action.payload.todolistId);
        if (todolistIndex > -1) {
          state.splice(todolistIndex, 1);
        }
      });
  }
});

export const todolistsSlice = slice.reducer;
export const {
  changeTodolistFilter,
  changeTodolistEntityStatusAC,
  clearDataAC
} = slice.actions;

const fetchTodolistsTC = createAppAsyncThunk('todolists/fetchTodolistsTC', async (arg, thunkAPI) => {
  let {dispatch} = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    let res = await todolistsApi.getTodolists();
    dispatch(appSetStatusAC({status: 'succeeded'}));
    return {todolists: res.data};
  });
});

const removeTodolist = createAppAsyncThunk('todolists/removeTodolistsTC',
  async (todolistId: string, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}));
    return thunkTryCatch(thunkAPI, async () => {
      let res = await todolistsApi.deleteTodolist(todolistId);
      if (res.data.resultCode ===  ResultCode.Success) {
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return {todolistId};
      } else {
        handleServerAppError(res.data, dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    });
  });

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>('todolists/addTodolistTC', async (title: string, thunkAPI) => {
  let {dispatch, rejectWithValue} = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    let res = await todolistsApi.createTodolist(title);
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appSetStatusAC({status: 'succeeded'}));
      return {todolist: res.data.data.item};
    } else {
      handleServerAppError(res.data, dispatch, false);
      return rejectWithValue(res.data);
    }
  });
});

const changeTodolistTitleTC = createAppAsyncThunk<{ id: string, title: string }, { id: string, title: string }>
('todolists/changeTodolistTitleTC', async ({id, title}, thunkAPI) => {
  let {dispatch} = thunkAPI;
  dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}));
  return thunkTryCatch(thunkAPI, async () => {
    let res = await todolistsApi.updateTodolist(id, title);
    if (res.data.resultCode === ResultCode.Success) {
      return {id, title};
    } else {
      handleServerAppError(res.data, dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  }).finally(() => {
    dispatch(appSetStatusAC({status: 'succeeded'}));
    dispatch(changeTodolistEntityStatusAC({id, status: 'idle'}));
  });
});

export let todolistAsyncActions = {
  fetchTodolistsTC,
  removeTodolist,
  addTodolist,
  changeTodolistTitleTC,
};
export const todolistActions = {...slice.actions, ...todolistAsyncActions};

export type ActionsTodolistsType =
  | ReturnType<typeof changeTodolistFilter>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ReturnType<typeof clearDataAC>
