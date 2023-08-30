import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../../api/todolists-api';
import {AppThunk} from '../../store';
import {TasksStateType} from '../TodolistsList';


export type ActionsTaskType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC> | ReturnType<typeof setTaskAC>

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)};
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.task} : t)
            };
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            };
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLIST': {
            const copyState = {...state};
            action.todolists.forEach(el => {
                copyState[el.id] = [];
            });
            return copyState;
        }
        case 'SET-TASK': {
            return {...state, [action.todolistId]: action.tasks};
        }
        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: 'REMOVE-TASK',
    taskId,
    todolistId
} as const);

export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const);

export const updateTaskAC = (taskId: string, task: UpdateTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', task, todolistId, taskId} as const;
};

export const setTaskAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASK', todolistId, tasks} as const;
};

export const fetchTaskTC = (todoId: string): AppThunk => (dispatch) => {
    todolistsAPI.getTasks(todoId)
        .then(res => {
            const action = setTaskAC(todoId, res.data.items);
            dispatch(action);
        });
};

export const removeTaskTC = (id: string, todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTask(todolistId, id)
        .then(() => {
            const action = removeTaskAC(id, todolistId);
            dispatch(action);
        });
};

export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            const action = addTaskAC(res.data.data.item);
            dispatch(action);
        });

};


export const updateTaskTC = (id: string, DomainModel: UpdateTaskModelDomainType, todolistId: string): AppThunk => (dispatch, getState) => {
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === id);
    if (task) {
        let model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            startDate: task.startDate,
            deadline: task.deadline,
            priority: task.priority,
            status: task.status,
            ...DomainModel
        };
        todolistsAPI.updateTask(todolistId, id, model)
            .then(() => {
                const action = updateTaskAC(id, model, todolistId);
                dispatch(action);
            });
    }
};


export type UpdateTaskModelDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}