import {AppThunk} from '../../app/store';
import {appSetStatusAC} from '../../app/app-reducer';
import {authApi, FieldErrorsType, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearDataAC} from '../../app/TodolistsList/Todolist/todolists-reducer';
import {AxiosError} from 'axios';

const slice = createSlice({
    name: 'auth',
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
            state.isLoggedIn = action.payload.isLoggedIn;
        });

    }
});
export const authReducer = slice.reducer;

export const {setIsLoggedInAC} = slice.actions;

export type ActionsLoginType = ReturnType<typeof setIsLoggedInAC>

export const loginTC = createAsyncThunk<{ isLoggedIn: boolean },
    LoginParamsType, {
    rejectValue:
        {
            errors: string[],
            fieldsErrors?: FieldErrorsType[]
        }
}>('auth/loginTC', async (data, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await authApi.auth(data);
        if (res.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {isLoggedIn: true};
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

export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    authApi.logOut()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: false}));
                dispatch(clearDataAC())
                ;
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })

        .finally(() => {
            dispatch(appSetStatusAC({status: 'succeeded'}));
        });
};


// export const loginTC = createAsyncThunk<{ isLoggedIn: boolean },
//     LoginParamsType,
//     {
//         rejectValue:
//             {
//                 errors: string[],
//                 fieldsErrors?: FieldErrorsType[]
//             }
//     }>('auth/loginTC', async (data: LoginParamsType, thunkApi) => {
//     thunkApi.dispatch(appSetStatusAC({status: 'loading'}));
//     try {
//         let res = await authApi.auth(data);
//         if (res.data.resultCode === 0) {
//             return {isLoggedIn: true};
//         } else {
//             handleServerAppError(res.data, thunkApi.dispatch);
//             return thunkApi.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors});
//         }
//     } catch (err: any) {
//         const error: AxiosError = err;
//         handleServerNetworkError(error, thunkApi.dispatch);
//         return thunkApi.rejectWithValue({errors: [error.message], fieldsErrors: undefined});
//     } finally {
//         thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}));
//     }
// })

// export const _loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
//     dispatch(appSetStatusAC({status: 'loading'}));
//     authApi.auth(data)
//         .then((res) => {
//             if (res.data.resultCode === 0) {
//                 dispatch(setIsLoggedInAC({isLoggedIn: true}));
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
//
//         .finally(() => {
//             dispatch(appSetStatusAC({status: 'succeeded'}));
//         });
// };


//     (state: initialStateType = initialState, action: ActionsLoginType): initialStateType => {
//     switch (action.type) {
//         case 'SET-IS-LOGGED-IN': {
//             return {...state, isLoggedIn: action.isLoggedIn};
//         }
//
//         default:
//             return state;
//     }
// };

// export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'SET-IS-LOGGED-IN', isLoggedIn} as const);