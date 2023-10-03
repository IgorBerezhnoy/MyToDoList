import {authApi} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {setIsLoggedInAC} from '../Login/login-reducer';
import {appSetErrorAC, appSetStatusAC} from './ApplicationCommonActions';


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


    },
    extraReducers: (builder) => {
        builder
            .addCase(appSetInitializedTC.fulfilled, (state, ) => {
                state.initialized = true;
            })
            .addCase(appSetStatusAC, (state, action) => {
                state.status = action.payload.status;
            })
            .addCase(appSetErrorAC, (state, action) => {
                state.error = action.payload.error;
            });
    }
});


export type InitialStateType = typeof initialState

export const appReducer = slice.reducer;


const appSetInitializedTC = createAsyncThunk('app/appSetInitializedTC', async (arg, {dispatch}) => {
    try {
        let res = await authApi.me();
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
    } finally {
        dispatch(appSetStatusAC({status: 'succeeded'}));
    }
});
export const AppActions = {appSetInitializedTC, appSetStatusAC, appSetErrorAC};
export type AppReducerActionsType =
    ReturnType<typeof appSetStatusAC>
    | ReturnType<typeof appSetErrorAC>

//
// .finally(() => {
//     dispatch(appSetInitializedAC({initialized: true}));
//     dispatch(appSetStatusAC({status: 'succeeded'}));
//
// });
// | ReturnType<typeof appSetInitializedAC>

// appSetInitializedAC(state, action: PayloadAction<{ initialized: boolean }>) {
//         //     state.initialized = action.payload.initialized;
//         // },

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

// export const {setIsLoggedInAC} = slice.actions;
// export const {setIsLoggedInAC} = slice.actions;
// export const appSetStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
// export const appSetErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
// export const appSetInitializedAC = (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const);
