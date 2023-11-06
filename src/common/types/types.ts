import {ActionsTodolistsType} from '../../features/TodolistList/model/todolists/todolistsSlice';
import {AppReducerActionsType} from '../../app/appSlice';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../../app';
export type ThunkType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type DispatchFunc = () => ThunkType
export type AppActionsType = ActionsTodolistsType | AppReducerActionsType