
import {slice, todolistAsyncActions} from './todolists-reducer';
import {taskAsyncActions} from './tasks-reducer';
import {TodolistsList} from '../TodolistsList';

const todolistActions = {...slice.actions, ...todolistAsyncActions};
export {taskAsyncActions, todolistActions, TodolistsList};