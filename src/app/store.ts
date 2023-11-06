import {tasksReducer, todolistsSlice} from '../features/TodolistList';
import {AnyAction, combineReducers} from 'redux';
import {appSlice} from '../features/Application';
import {configureStore} from '@reduxjs/toolkit';
import {loginSlice} from '../features/auth';
import {ThunkDispatch} from 'redux-thunk';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsSlice,
    app: appSlice,
    login: loginSlice
});
// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));


export const store = configureStore({
    reducer: rootReducer,
    // middleware:(getDefaultMiddleware)=>{
    //     return getDefaultMiddleware().prepend(thunk);}
});


// определить автоматически тип всего объекта состояния
export type RootReducerType = typeof rootReducer

export type AppRootStateType = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

