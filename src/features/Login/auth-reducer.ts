import {AppThunk} from '../../app/store';
import {appSetStatusAC} from '../../app/app-reducer';
import {authApi, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


// type initialStateType = typeof initialState
const initialState = {
    isLoggedIn: false
};

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        }
    }
});
export const authReducer = slice.reducer;
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
export const {setIsLoggedInAC} = slice.actions;

export type ActionsLoginType = ReturnType<typeof setIsLoggedInAC>


export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    authApi.auth(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}));
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
export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    authApi.logOut()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}));
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