import {slice, todolistAsyncActions} from './todolists-reducer';
import {taskAsyncActions} from './Task/tasks-reducer';
import {TodolistsList} from '../TodolistsList';

const todolistActions = {...slice.actions, ...todolistAsyncActions};
export {taskAsyncActions, todolistActions, TodolistsList};