import {combineReducers, createStore, legacy_createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import {todolistsReducer} from './todolists-reducer';

let rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
});

export type AppRootStateType=ReturnType<typeof rootReducer>

export let store = legacy_createStore(rootReducer);

// @ts-ignore
window.store=store