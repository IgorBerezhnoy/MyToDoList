import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});
// type AppRootState= { todolists:TodolistType[],tasks:TasksStateType }


export type AppRootState=ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;