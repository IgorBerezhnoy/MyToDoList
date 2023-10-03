import {createAction} from '@reduxjs/toolkit';
import {RequestStatusType} from './app-reducer';

export const appSetStatusAC=createAction<{ status: RequestStatusType }>("app/setStatusAC")
export const appSetErrorAC=createAction<{ error: string | null }>("app/setErrorAC")