import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type ActionsType =RemoveTodolistActionType|AddTodolistActionType|ChangeTodolistTitleActionType|ChangeTodolistFilterActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), filter: 'all', title: action.title}];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id == action.id ? {...el, title: action.title} : el);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id == action.id ? {...el, filter: action.filter} : el);
        }
        default:
            throw new Error('I don\'t understand this action type');
    }
};

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
    export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title}
}
   export const ChangeTodolistTitleAC = (title: string,id:string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title,id}
}
export const  ChangeTodolistFilterAC = (filter: FilterValuesType,id:string):  ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter,id}

}
