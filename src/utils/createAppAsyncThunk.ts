import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppRootStateType} from '../app';
import {BaseResponseType} from '../types';

export const createAppAsyncThunk=createAsyncThunk.withTypes<CreatedAsyncThunkType>()
type CreatedAsyncThunkType = { state: AppRootStateType,  rejectValue: null | BaseResponseType };
