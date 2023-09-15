import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsApi,
    TodolistType,
    UpdateTaskModelType
} from '../../../api/todolists-api';
import {AppThunk} from '../../store';
import {TasksStateType} from '../TodolistsList';
import {appSetStatusAC} from '../../app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export type ActionsTaskType = ReturnType<typeof removeTaskAC> | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof setTodolistsAC> | ReturnType<typeof setTaskAC>

const initialState: TasksStateType = {};

let slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
            let findIndex = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            state[action.payload.todolistId].splice(findIndex,1)
                  },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, task: UpdateTaskModelType, todolistId: string }>) {
            let findIndex = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
            state[action.payload.todolistId][findIndex] = {...state[action.payload.todolistId][findIndex], ...action.payload.task};

        },
        setTaskAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks;
        },
    },
    extraReducers:(builder)=> {
        builder.addCase(addTodolistAC,(state, action)=>{ state[action.payload.todolist.id] = []} )
        builder.addCase(removeTodolistAC,(state, action)=>{ delete state[action.payload.todolistId]} )
        builder.addCase(setTodolistsAC,(state, action)=>{ action.payload.todolists.forEach(el => {state[el.id] = [];})}
}
});


export const tasksReducer = slice.reducer;
export const {removeTaskAC, addTaskAC, updateTaskAC, setTaskAC} = slice.actions;

export const fetchTaskTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    todolistsApi.getTasks(todolistId)
        .then(res => {
            const action = setTaskAC({todolistId, tasks: res.data.items});
            dispatch(action);
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(appSetStatusAC({status: 'succeeded'}));
        });


};

export const removeTaskTC = (taskId: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    todolistsApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const action = removeTaskAC({taskId, todolistId});
                dispatch(action);
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })

        .finally(() => {
            dispatch(appSetStatusAC({status: 'succeeded'}));
        });
};

export const addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    todolistsApi.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = addTaskAC({task: res.data.data.item});
                dispatch(action);
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(appSetStatusAC({status: 'succeeded'}));
        });
};


export const updateTaskTC = (taskId: string, DomainModel: UpdateTaskModelDomainType, todolistId: string): AppThunk => (dispatch, getState) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    const state = getState();
    const task = state.tasks[todolistId].find(t => t.id === taskId);
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
        todolistsApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId, task: model, todolistId});
                    dispatch(action);
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
            .finally(() => {
                dispatch(appSetStatusAC({status: 'succeeded'}));
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


// export const removeTaskAC = (taskId: string, todolistId: string) => ({
//     type: 'REMOVE-TASK',
//     taskId,
//     todolistId
// } as const);
//
// export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const);
//
// export const updateTaskAC = (taskId: string, task: UpdateTaskModelType, todolistId: string) => {
//     return {type: 'UPDATE-TASK', task, todolistId, taskId} as const;
// };
//
// export const setTaskAC = (todolistId: string, tasks: TaskType[]) => {
//     return {type: 'SET-TASK', todolistId, tasks} as const;
// (state: TasksStateType = initialState, action: ActionsTaskType): TasksStateType => {
//     switch (action.type) {
//         case 'REMOVE-TASK': {
//             return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)};
//         }
//         case 'ADD-TASK': {
//             return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
//         }
//         case 'UPDATE-TASK': {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.task} : t)
//             };
//         }
//         case addTodolistAC.type: {
//             return {
//                 ...state,
//                 [action.payload.todolist.id]: []
//             };
//         }
//         case removeTodolistAC.type: {
//             const copyState = {...state};
//             delete copyState[action.payload.todolistId];
//             return copyState;
//         }
//         case setTodolistsAC.type: {
//             const copyState = {...state};
//             action.payload.todolists.forEach(el => {
//                 copyState[el.id] = [];
//             });
//             return copyState;
//         }
//         case 'SET-TASK': {
//             return {...state, [action.todolistId]: action.tasks};
//         }
//         default:
//             return state;
//     }
// };


// };
