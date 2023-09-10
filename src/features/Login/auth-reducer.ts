import {AppThunk} from '../../app/store';
import {appSetStatusAC} from '../../app/app-reducer';
import {authApi, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


export type ActionsLoginType = ReturnType<typeof setIsLoggedIn>
type initialStateType = typeof initialState
const initialState = {
    isLoggedIn: false
};


export const authReducer = (state: initialStateType = initialState, action: ActionsLoginType): initialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.isLoggedIn};
        }

        default:
            return state;
    }
};

export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'SET-IS-LOGGED-IN', isLoggedIn} as const);

export const loginTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC('loading'));
    authApi.auth(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(true));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })

        .finally(() => {
            dispatch(appSetStatusAC('succeeded'));
        });
};
export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC('loading'));
    authApi.logOut()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn(false));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })

        .finally(() => {
            dispatch(appSetStatusAC('succeeded'));
        });
};