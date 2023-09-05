import {AppThunk} from './store';
import {authApi} from '../api/todolists-api';
import {handelServerAppError, handelServerNetworkError} from '../utils/error-utils';
import {setIsLoggedInAS} from '../feachers/Login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type StateAppReducerType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type AppReducerActionType =
    ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppInitializedAC>

let initialState: StateAppReducerType = {
    status: 'idle',
    error: null,
    isInitialized: false
};

export let appReducer = (state: StateAppReducerType = initialState, action: AppReducerActionType): StateAppReducerType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR': {
            return {...state, error: action.error};
        }
        case 'APP/SET-INITIALIZED': {
            return {...state, isInitialized: action.isInitialized};
        }
        default: {
            return state;
        }
    }
};

export const setAppInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const);
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);


export const setAppInitializedTC = (): AppThunk => (dispatch) => {

    authApi.authMe()
        .then(res => {
            if (res.data.resultCode == 0) {
                dispatch(setIsLoggedInAS(true))
            } else {
                handelServerAppError(res.data, dispatch);
                dispatch(setIsLoggedInAS(false));
            }
        })
        .catch((error) => {
            handelServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(setAppInitializedAC(true));
        });
};
