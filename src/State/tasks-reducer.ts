import {TasksStateType} from '../App';
import {AddTodolistAT, RemoveTodolistAT} from './todolists-reducer';


type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT|AddTodolistAT|RemoveTodolistAT

export type RemoveTaskAT = { type: 'REMOVE-TASKS', todoId: string, taskId: string }
export type AddTaskAT = { type: 'ADD-TASKS', todoId: string, title: string, taskId: string }
export type ChangeTaskStatusAT = { type: 'CHANGE-TASKS-STATUS', todoId: string, taskId: string, isDone: boolean }
export type ChangeTaskTitleAT = { type: 'CHANGE-TASKS-TITLE', todoId: string, taskId: string, title: string }
// export type AddTodolistAT = {    type: 'ADD-TODOLIST', newTodoId:string }

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {...state, [action.todoId]: state[action.todoId].filter(el => el.id !== action.taskId)};
        case 'ADD-TASKS':
            let newTask = {id: action.taskId, title: action.title, isDone: false};
            return {...state, [action.todoId]: [newTask, ...state[action.todoId]]};
        case 'CHANGE-TASKS-STATUS':
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el => el.id === action.taskId ? {
                    ...el,
                    isDone: action.isDone
                } : el)
            };
        case 'CHANGE-TASKS-TITLE':
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(el => el.id === action.taskId ? {
                    ...el,
                    title: action.title
                } : el)
            };
            case 'ADD-TODOLIST':
            return {...state,[action.newTodolistId]:[]};
            case 'REMOVE-TODOLIST':
            let copyState={...state}
            delete copyState[action.id]
            return copyState
        default:
            throw new Error('I don\'t understand this type');
    }
};

export const removeTaskAC = (todoId: string, taskId: string): RemoveTaskAT => ({
    type: 'REMOVE-TASKS',
    todoId,
    taskId,
});
export const addTaskAC = (todoId: string, taskId: string, title: string): AddTaskAT => ({
    type: 'ADD-TASKS',
    todoId,
    title,
    taskId
});
export const changeTaskStatusAC = (todoId: string, taskId: string, isDone: boolean): ChangeTaskStatusAT => ({
    type: 'CHANGE-TASKS-STATUS',
    todoId,
    taskId,
    isDone
});
export const changeTaskTitleAC = (todoId: string, taskId: string, title: string): ChangeTaskTitleAT => ({
    type: 'CHANGE-TASKS-TITLE',
    todoId,
    taskId,
    title
});
// export const RemoveTodolistAC = (todoId: string): RemoveTodolistAT => ({
//     type: 'CHANGE-TASKS-TITLE',
//     todoId
// });


// export const addTodolistAC = (newTodoId: string): AddTodolistAT => ({
//     type: 'ADD-TODOLIST',
//     newTodoId,
//
// });
