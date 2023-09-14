import {ActionsTaskType, tasksReducer} from './TodolistsList/Todolist/tasks-reducer';
import {ActionsTodolistsType, todolistsReducer} from './TodolistsList/Todolist/todolists-reducer';
import {combineReducers} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {appReducer, AppReducerActionsType} from './app-reducer';
import {ActionsLoginType, authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
});
// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
});


// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootReducerType =typeof rootReducer

export type AppActionsType = ActionsTodolistsType | ActionsTaskType | AppReducerActionsType | ActionsLoginType


export type ThunkType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type DispatchFunc = () => ThunkType
export const useAppDispatch: DispatchFunc = useDispatch;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;