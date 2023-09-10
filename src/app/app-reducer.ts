import {authApi, LoginParamsType} from '../api/todolists-api';
import {AppThunk} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedIn} from '../features/Login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false as boolean
};

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        case 'APP/SET-INITIALIZED':
            return {...state, initialized: action.initialized};
        default:
            return state;
    }
};

export const appSetStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const appSetErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
export const appSetInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const);


export const appSetInitializedTC = (): AppThunk => (dispatch) => {
    authApi.me()
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
            dispatch(appSetInitializedAC(true));
        });
};


export type AppReducerActionsType =
    ReturnType<typeof appSetStatusAC>
    | ReturnType<typeof appSetErrorAC>
    | ReturnType<typeof appSetInitializedAC>
