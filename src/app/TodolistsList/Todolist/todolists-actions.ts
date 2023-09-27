import {createAsyncThunk} from '@reduxjs/toolkit';
import {appSetStatusAC} from '../../app-reducer';
import {todolistsApi, TodolistType} from '../../../api/todolists-api';
import {handleServerNetworkError} from '../../../utils/error-utils';
import {changeTodolistEntityStatusAC} from './todolists-reducer';

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolistsTC', async (arg, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await todolistsApi.getTodolists();
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return {todolists: res.data};
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return thunkAPI.rejectWithValue({todolists: {}});
    }
});
export const removeTodolistTC = createAsyncThunk('todolists/removeTodolistsTC',
    async (todolistId: string, thunkAPI) => {
        let {dispatch, extra} = thunkAPI;
        //await extra.api.delete('')
        dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}));
        dispatch(appSetStatusAC({status: 'loading'}));
        try {
            await todolistsApi.deleteTodolist(todolistId);
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {todolistId};
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            dispatch(appSetStatusAC({status: 'failed'}));
            return thunkAPI.rejectWithValue({});
        }
    });
export const addTodolistTC = createAsyncThunk<{ todolist: TodolistType }, string>('todolists/addTodolistTC', async (title: string, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await todolistsApi.createTodolist(title);
        dispatch(appSetStatusAC({status: 'succeeded'}));

        return {todolist: res.data.data.item};
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        dispatch(appSetStatusAC({status: 'failed'}));
        return thunkAPI.rejectWithValue('');
    }
});
export const changeTodolistTitleTC = createAsyncThunk<{ id: string, title: string }, { id: string, title: string }>
('todolists/changeTodolistTitleTC', async ({id, title}, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}));
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        await todolistsApi.updateTodolist(id, title);
        return {id, title};
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return thunkAPI.rejectWithValue({});
    } finally {
        dispatch(appSetStatusAC({status: 'succeeded'}));
        dispatch(changeTodolistEntityStatusAC({id, status: 'idle'}));
    }

});