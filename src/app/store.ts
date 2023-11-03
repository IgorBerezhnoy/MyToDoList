import {tasksReducer, todolistsReducer} from '../features/TodolistList';
import {AnyAction, combineReducers} from 'redux';
import {appReducer} from '../features/Application';
import {configureStore} from '@reduxjs/toolkit';
import {loginReducer} from '../features/Login';
import {ThunkDispatch} from 'redux-thunk';

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
export type RootReducerType = typeof rootReducer

export type AppRootStateType = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

