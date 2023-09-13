import {authApi} from '../api/todolists-api';
import {AppThunk} from './store';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,
    initialized: false as boolean
};

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        appSetStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        appSetErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        },
        appSetInitializedAC(state, action: PayloadAction<{ initialized: boolean }>) {
            state.initialized = action.payload.initialized;
        },

    }
});


export type InitialStateType = typeof initialState

export const appReducer = slice.reducer;
//     (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status};
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error};
//         case 'APP/SET-INITIALIZED':
//             return {...state, initialized: action.initialized};
//         default:
//             return state;
//     }
// };
export const {appSetStatusAC, appSetErrorAC, appSetInitializedAC} = slice.actions;
// export const {setIsLoggedInAC} = slice.actions;
// export const {setIsLoggedInAC} = slice.actions;
// export const appSetStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
// export const appSetErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
// export const appSetInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const);


export const appSetInitializedTC = (): AppThunk => (dispatch) => {
    authApi.me()
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
            dispatch(appSetInitializedAC({initialized: true}));
        });
};


export type AppReducerActionsType =
    ReturnType<typeof appSetStatusAC>
    | ReturnType<typeof appSetErrorAC>
    | ReturnType<typeof appSetInitializedAC>
