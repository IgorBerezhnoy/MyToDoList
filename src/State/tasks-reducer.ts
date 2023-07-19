import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    newTitle: string
    todolistId: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASKS-STATUS',
    taskId: string
    todolistId: string
    isDone: boolean
}
export type changeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string
    todolistId: string
    newTitle: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusAT|changeTaskTitleAT|RemoveTodolistActionType|AddTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)};
        case 'ADD-TASK':
            let task = {id: v1(), title: action.newTitle, isDone: false};

            return {...state, [action.todolistId]: [task, ...state[action.todolistId]]};
        case 'CHANGE-TASKS-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id == action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            };
            case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(el => el.id == action.taskId ? {
                    ...el,
                    title: action.newTitle
                } : el)
            };
        case 'ADD-TODOLIST':
            return {...state,[action.title]:[]}
        case 'REMOVE-TODOLIST':
            let copyState={...state}
            delete copyState[action.id]
            return copyState
        default:
            throw new Error('I don\'t understand this type');
    }
};

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId};
};
export const addTaskAC = (todolistId: string, newTitle: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, newTitle};
};
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASKS-STATUS', todolistId, taskId, isDone};
};
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string): changeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, newTitle};
};
