import {clearDataAC, todolistAsyncActions} from '../todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsApi, UpdateTaskModelType} from '../../../../api/todolists-api';
import {TasksStateType} from '../../TodolistsList';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {AppRootStateType} from '../../../../app/store';
import {appSetStatusAC} from '../../../Application';

const initialState: TasksStateType = {};
const {removeTodolist, fetchTodolistsTC, addTodolist} = todolistAsyncActions;
const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state[action.payload.task.todoListId].unshift(action.payload.task);
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state[action.payload.todolistId] = state[action.payload.todolistId]
                    .filter(t => t.id != action.payload.taskId);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state[action.payload.todolistId] = state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.task} : t);
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.todolistId];
            })
            .addCase(clearDataAC, (state, action) => {
                return {};
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                action.payload.todolists.forEach(el => {
                    state[el.id] = [];
                });
            });
    }
});


const fetchTask = createAsyncThunk<{ todolistId: string, tasks: TaskType[] }, string>
('tasks/fetchTask', async (todolistId, thunkAPI) => {
    let {dispatch} = thunkAPI;
    try {
        dispatch(appSetStatusAC({status: 'loading'}));
        let res = await todolistsApi.getTasks(todolistId);
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return {todolistId, tasks: res.data.items};
    } catch (e: any) {
        handleServerNetworkError(e, dispatch);
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return {todolistId, tasks: []};
    }
});
const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }>
('tasks/removeTask', async ({taskId, todolistId}, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await todolistsApi.deleteTask(todolistId, taskId);
        if (res.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {taskId, todolistId};
        } else {
            handleServerAppError(res.data, dispatch);
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {taskId, todolistId};
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return {taskId, todolistId};
    }
});
const addTask = createAsyncThunk<{ task: TaskType }, { title: string, todolistId: string }>
('tasks/addTaskTC', async ({title, todolistId}, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await todolistsApi.createTask(todolistId, title);

        if (res.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {task: res.data.data.item};
        } else {
            handleServerAppError(res.data, dispatch);
            debugger
            return thunkAPI.rejectWithValue({});

        }
    } catch (error) {
        dispatch(appSetStatusAC({status: 'failed'}));
        return thunkAPI.rejectWithValue({task: {}});
    }
});
const updateTask = createAsyncThunk<any, { taskId: string, domainModel: UpdateTaskModelDomainType, todolistId: string }>
('tasks/updateTaskTC', async ({taskId, domainModel, todolistId}, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(appSetStatusAC({status: 'loading'}));
    const state = thunkAPI.getState() as AppRootStateType;
    const task = state.tasks[todolistId].find(t => t.id === taskId);
    if (task) {
        let model: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            startDate: task.startDate,
            deadline: task.deadline,
            priority: task.priority,
            status: task.status,
            ...domainModel
        };
        try {
            let res = await todolistsApi.updateTask(todolistId, taskId, model);
            if (res.data.resultCode === 0) {
                dispatch(appSetStatusAC({status: 'succeeded'}));
                return {taskId, task: model, todolistId};
            } else {
                dispatch(appSetStatusAC({status: 'failed'}));
                handleServerAppError(res.data, dispatch);
                return thunkAPI.rejectWithValue({});
            }
        } catch (error: any) {
            dispatch(appSetStatusAC({status: 'failed'}));
            handleServerNetworkError(error, dispatch);
            return thunkAPI.rejectWithValue({});

        }
    }
});


export const taskAsyncActions = {
    fetchTask, removeTask, addTask, updateTask
};
export const tasksReducer = slice.reducer;
// export const {updateTaskAC, /*addTaskAC*/} = slice.actions;


export type UpdateTaskModelDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

// addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
//     state[action.payload.task.todoListId].unshift(action.payload.task);
// },
// updateTaskAC(state, action: PayloadAction<{ taskId: string, task: UpdateTaskModelType, todolistId: string }>) {
//     state[action.payload.todolistId] = state[action.payload.todolistId]
//         .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.task} : t);
// },

// export const _addTaskTC = (title: string, todolistId: string): AppThunk => (dispatch) => {
//     dispatch(appSetStatusAC({status: 'loading'}));
//     todolistsApi.createTask(todolistId, title)
//         .then(res => {
//             if (res.data.resultCode === 0) {
//                 const action = addTaskAC({task: res.data.data.item});
//                 dispatch(action);
//             } else {
//                 handleServerAppError(res.data, dispatch);
//             }
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
//         .finally(() => {
//             dispatch(appSetStatusAC({status: 'succeeded'}));
//         });
// };


// export const _updateTaskTC = (taskId: string, DomainModel: UpdateTaskModelDomainType, todolistId: string): AppThunk => (dispatch, getState) => {
//     dispatch(appSetStatusAC({status: 'loading'}));
//     const state = getState();
//     const task = state.tasks[todolistId].find(t => t.id === taskId);
//     if (task) {
//         let model: UpdateTaskModelType = {
//             title: task.title,
//             description: task.description,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             priority: task.priority,
//             status: task.status,
//             ...DomainModel
//         };
//         todolistsApi.updateTask(todolistId, taskId, model)
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     const action = updateTaskAC({taskId, task: model, todolistId});
//                     dispatch(action);
//                 } else {
//                     handleServerAppError(res.data, dispatch);
//                 }
//             })
//             .catch(error => {
//                 handleServerNetworkError(error, dispatch);
//             })
//             .finally(() => {
//                 dispatch(appSetStatusAC({status: 'succeeded'}));
//             });
//     }
// };


//     (state: TasksStateType = initialState, action: ActionsTaskType): TasksStateType => {
//     switch (action.type) {
//
//         default:
//             return state;
//     }
// };
// export const removeTaskAC = (taskId: string, todolistId: string) => ({
//     type: 'REMOVE-TASK',
//     taskId,
//     todolistId
// } as const);

// export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const);
//
// export const updateTaskAC = (taskId: string, task: UpdateTaskModelType, todolistId: string) => {
//     return {type: 'UPDATE-TASK', task, todolistId, taskId} as const;
// };
//
// export const setTaskAC = (todolistId: string, tasks: TaskType[]) => {
//     return {type: 'SET-TASK', todolistId, tasks} as const;
// };


// case 'REMOVE-TASK': {
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


// }    extraReducers: {
//     [addTodolistAC.type]: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
//         state[action.payload.todolist.id] = [];
//     },
//     [removeTodolistAC.type]: (state, action: PayloadAction<{ todolistId: string }>) => {
//         delete state[action.payload.todolistId];
//
//     },
//     [setTodolistsAC.type]: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
//         action.payload.todolists.forEach(el => {
//             state[el.id] = [];
//         });
//     }
// }