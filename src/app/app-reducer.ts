import React from 'react';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type StateAppReducerType = {
    status: RequestStatusType
    error: string | null
}

export type AppReducerActionType = ReturnType<typeof setAppErrorAC> | ReturnType<typeof setAppStatusAC>

let initialState: StateAppReducerType = {
    status: 'idle',
    error: null
};

export let appReducer = (state: StateAppReducerType = initialState, action: AppReducerActionType): StateAppReducerType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status};
        case 'APP/SET-ERROR': {
            return {...state, error: action.error};
        }

        default: {
            return state;
        }
    }
};

export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const);
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const);
