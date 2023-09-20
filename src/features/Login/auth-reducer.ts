import {AppThunk} from '../../app/store';
import {appSetStatusAC} from '../../app/app-reducer';
import {authApi, LoginParamsType, todolistsApi} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearDataAC} from '../../app/TodolistsList/Todolist/todolists-reducer';


// export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
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

export const loginTC = createAsyncThunk('auth/loginTC', async (data: LoginParamsType, thunkApi) => {
    thunkApi.dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await authApi.auth(data);
        if (res.data.resultCode === 0) {
            return {isLoggedIn: true};
        } else {
            handleServerAppError(res.data, thunkApi.dispatch);
            return {isLoggedIn: false};

        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkApi.dispatch);
        return {isLoggedIn: false};
    }finally {
        thunkApi.dispatch(appSetStatusAC({status: 'succeeded'}));
    }
});
const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    },
    extraReducers: (builder) =>{
        builder. addCase(loginTC.fulfilled,(state, action)=> {
                    state.isLoggedIn = action.payload.isLoggedIn;
        }
        )}
});
export const authReducer = slice.reducer;

export const {setIsLoggedInAC} = slice.actions;

export type ActionsLoginType = ReturnType<typeof setIsLoggedInAC>


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
};//     (state: initialStateType = initialState, action: ActionsLoginType): initialStateType => {
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