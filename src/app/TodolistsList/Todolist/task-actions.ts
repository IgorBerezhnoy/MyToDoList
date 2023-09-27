import {createAsyncThunk} from '@reduxjs/toolkit';
import {appSetStatusAC} from '../../app-reducer';
import {TaskType, todolistsApi, UpdateTaskModelType} from '../../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';
import {AppRootStateType} from '../../store';
import {UpdateTaskModelDomainType} from './tasks-reducer';

export const fetchTask = createAsyncThunk<{ todolistId: string, tasks: TaskType[] }, string>
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
export const removeTaskTC = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }>
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
export const addTaskTC = createAsyncThunk<{ task: TaskType }, { title: string, todolistId: string }>
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
            dispatch(appSetStatusAC({status: 'failed'}));
            return thunkAPI.rejectWithValue({task: {}});
        }
    } catch (error) {
        dispatch(appSetStatusAC({status: 'failed'}));
        return thunkAPI.rejectWithValue({task: {}});
    }
});
export const updateTaskTC = createAsyncThunk<any, { taskId: string, domainModel: UpdateTaskModelDomainType, todolistId: string }>
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