import {v1} from 'uuid';
import {AddTodolistActionType, removeTodolistAC, RemoveTodolistActionType, SetTodolistType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api';
import {AppThunk} from './store';
import {TasksStateType} from '../AppWithRedux';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}
export type SetTaskAT = ReturnType<typeof setTaskAC>
export type ActionsTaskType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistType | SetTaskAT

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsTaskType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {

            const stateCopy = {...state};
            const newTask: TaskType = {
                id: action.task.id,
                title: action.task.title,
                status: action.task.status,
                todoListId: action.task.todoListId,
                description: action.task.description,
                startDate: action.task.startDate,
                deadline: action.task.deadline,
                addedDate: action.task.addedDate,
                order: action.task.order,
                priority: action.task.priority
            };
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
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

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId};
};
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task};
};
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId};
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId};
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
        .then(res => {
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

type UpdateTaskModelDomainType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = ((id: string, model: UpdateTaskModelDomainType, todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTask(todolistId,id,model)
        .then(res => {
            const action = addTaskAC(res.data.data.item);
            dispatch(action);
        });
};