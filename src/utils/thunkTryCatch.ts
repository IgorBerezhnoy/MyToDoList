import {handleServerNetworkError} from './handleServerNetworkError';
import {AppDispatch, AppRootStateType} from '../app';
import {BaseResponseType} from '../types';
import {appActions} from '../features/Application';
import {BaseThunkAPI} from '@reduxjs/toolkit/dist/createAsyncThunk';

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
  logic: () => Promise<T>): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const {dispatch, rejectWithValue} = thunkAPI;
  dispatch(appActions.appSetStatusAC({status: 'loading'}));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.appSetStatusAC({status: 'idle'}));
  }
};