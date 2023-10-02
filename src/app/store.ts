import {tasksReducer, todolistsReducer} from '../features/TodolistList';
import {combineReducers} from 'redux';
import {appReducer} from '../features/Application/app-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {loginReducer} from '../features/Login';

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


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

