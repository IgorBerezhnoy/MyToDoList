import {AppThunk} from '../../app/store';
import {setAppStatusAC} from '../../app/app-reducer';
import {authApi, LoginParamsType} from '../../api/todolists-api';
import {handelServerAppError, handelServerNetworkError} from '../../utils/error-utils';

export type ActionsLoginType = ReturnType<typeof setIsLoggedInAS>
export type initialStateType = { isLoggedIn: boolean }
const initialState = {
    isLoggedIn: false
};

export const authReducer = (state: initialStateType = initialState, action: ActionsLoginType): initialStateType => {
    switch (action.type) {
        case 'login/SET_IS_LOGGED_IN': {
            return {...state, isLoggedIn: action.isLoggedIn};
        }

        default:
            return state;
    }
};

export const setIsLoggedInAS = (isLoggedIn: boolean) => ({
    type: 'login/SET_IS_LOGGED_IN', isLoggedIn

} as const);


export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi.login(data)
        .then(res => {
            if (res.data.resultCode == 0) {
                dispatch(setIsLoggedInAS(true))

            } else {
                handelServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handelServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        });
};
export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    authApi.logOut()
        .then(res => {
            // debugger
            if (res.data.resultCode == 0) {
                dispatch(setIsLoggedInAS(false))
            } else {
                handelServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handelServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'));
        });
};