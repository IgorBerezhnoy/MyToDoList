import {FieldErrorsType} from '../../../common/api';
import {handleServerNetworkError} from '../../../common/utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearDataAC} from '../../TodolistList/model/todolists/todolistsSlice';
import {appSetStatusAC} from '../../Application';
import {createAppAsyncThunk} from '../../../common/utils';
import {authApi, LoginParamsType} from '../../../common/api';
import {handleServerAppError} from '../../../common/utils';
import {thunkTryCatch} from '../../../common/utils/thunkTryCatch';
import {ResultCode} from '../../../common/enums';

export const slice = createSlice({
  name: 'login',
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      state.isLoggedIn = true;
    });
    builder.addCase(logOutTC.fulfilled, (state, action) => {
      state.isLoggedIn = false;
    });

  }
});
export const loginSlice = slice.reducer;

export let {setIsLoggedInAC} = slice.actions;

export const loginTC = createAppAsyncThunk<undefined, LoginParamsType, {
  rejectValue: {
    errors: string[],
    fieldsErrors?: FieldErrorsType[]
  }
}>('login/loginTC', async (data, thunkAPI) => {
  let {dispatch} = thunkAPI;
  dispatch(appSetStatusAC({status: 'loading'}));
  try {
    let res = await authApi.auth(data);
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appSetStatusAC({status: 'succeeded'}));
      return;
    } else {
      dispatch(appSetStatusAC({status: 'succeeded'}));
      handleServerAppError(res.data, dispatch);
      return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
    }
  } catch (error: any) {
    // let error:AxiosError=err
    dispatch(appSetStatusAC({status: 'succeeded'}));
    handleServerNetworkError(error, dispatch);
    return thunkAPI.rejectWithValue({errors: [], fieldsErrors: undefined});

  }
});

const logOutTC = createAppAsyncThunk('login/logOutTC', async (arg, thunkAPI) => {
  let {dispatch} = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    let res = await authApi.logOut();
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(clearDataAC());
      dispatch(appSetStatusAC({status: 'succeeded'}));
      return;
    } else {
      dispatch(appSetStatusAC({status: 'succeeded'}));
      handleServerAppError(res.data, dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  });
});
export let asyncLoginActions = {loginTC, logOutTC, ...slice.actions};

