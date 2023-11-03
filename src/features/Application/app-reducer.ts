import {createSlice, isFulfilled, isPending, isRejected} from '@reduxjs/toolkit';
import {setIsLoggedInAC} from '../Login/login-reducer';
import {appSetErrorAC, appSetStatusAC} from './ApplicationCommonActions';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError} from '../../utils';
import {authApi} from '../../api';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string,
  initialized: false as boolean
};

const slice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(appSetInitializedTC.fulfilled, (state,) => {
        state.initialized = true;
      })
      .addCase(appSetStatusAC, (state, action) => {
        state.status = action.payload.status;
      })
      .addCase(appSetErrorAC, (state, action) => {
        state.error = action.payload.error;
      })
      .addMatcher(isPending, (state, action) => {
        state.status = 'loading';
      })
      .addMatcher(isRejected, (state, action) => {
        state.status = 'failed';
      })
      .addMatcher(isFulfilled, (state, action) => {
        state.status = 'succeeded';
      });
  }
});


export type InitialStateType = typeof initialState

export const appReducer = slice.reducer;

export const appSetInitializedTC = createAppAsyncThunk<{ isInitialized: true }, undefined>('app/initializeAppTC', async (arg, thunkAPI) => {
  let {dispatch, rejectWithValue} = thunkAPI;
  try {
    let res = await authApi.me();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({isLoggedIn: true}));
    } else {
      handleServerAppError(res.data, dispatch, false);
      return rejectWithValue(null);
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  } finally {
    return {isInitialized: true};
  }
});

export const appActions = {appSetInitializedTC, appSetStatusAC, appSetErrorAC};
export type AppReducerActionsType =
  ReturnType<typeof appSetStatusAC>
  | ReturnType<typeof appSetErrorAC>

//
