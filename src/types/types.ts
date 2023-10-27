import {ActionsTodolistsType} from '../features/TodolistList/Todolist/todolists-reducer';
import {AppReducerActionsType} from '../features/Application/app-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../app';
export type ThunkType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type DispatchFunc = () => ThunkType
export type AppActionsType = ActionsTodolistsType | AppReducerActionsType