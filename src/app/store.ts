import {tasksReducer} from './TodolistsList/Todolist/tasks-reducer';
import {ActionsTodolistsType, todolistsReducer} from './TodolistsList/Todolist/todolists-reducer';
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {appReducer, AppReducerActionsType} from './app-reducer';
import {ActionsLoginType, loginReducer} from '../features/Login/login-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {useMemo} from 'react';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: loginReducer
});
// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export const store = configureStore({
    reducer: rootReducer,
    // middleware:(getDefaultMiddleware)=>{
    //     return getDefaultMiddleware().prepend(thunk);}
});


// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootReducerType = typeof rootReducer

export type AppActionsType = ActionsTodolistsType | /*ActionsTaskType | */AppReducerActionsType | ActionsLoginType


export type ThunkType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type DispatchFunc = () => ThunkType
export const useAppDispatch: DispatchFunc = useDispatch;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;


export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch();
    const boundActions = useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, []);
    return boundActions;
}