import {createAsyncThunk} from '@reduxjs/toolkit';
import { AppRootStateType} from '../app/store';

export const createAppAsyncThunk=createAsyncThunk.withTypes<CreatedAsyncThunkType>()
type CreatedAsyncThunkType = { state: AppRootStateType, rejectValue: null };
