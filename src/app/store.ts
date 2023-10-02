import {tasksReducer} from '../features/TodolistList';
import { todolistsReducer} from '../features/TodolistList';
import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {appReducer, AppReducerActionsType} from './app-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import { loginReducer} from '../features/Login';

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
