import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AppRootStateType} from '../app';
import {BaseResponseType} from '../types';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null | BaseResponseType;
}>();
