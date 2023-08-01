import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
 | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType;
const initialState: TasksStateType={
    ["todolistId1"]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    ["todolistId2"]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksStateType=initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
           return {...state,[action.todolistId]:state[action.todolistId].filter(el=>el.id!==action.taskId)}
        }
        case 'ADD-TASK': {

            const newTask = {id: v1(), title: action.title, isDone: false};
            return {...state,[action.todolistId]:[...state[action.todolistId],newTask]}
        }
        case 'CHANGE-TASK-STATUS': {
            return {...state,[action.todolistId]:state[action.todolistId].map(el=>el.id===action.taskId?{...el,isDone:action.isDone}:el)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state,[action.todolistId]:state[action.todolistId].map(el=>el.id===action.taskId?{...el,title:action.title}:el)}

        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};

            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
           return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                   title: string,
                                   todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}

