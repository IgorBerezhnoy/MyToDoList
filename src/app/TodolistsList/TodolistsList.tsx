import {TaskDomainType, TaskStatuses, TaskType} from '../../api/todolists-api';
import React, {useCallback, useEffect} from 'react';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './Todolist/todolists-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../store';
import {addTaskTC, removeTaskTC, updateTaskTC} from './Todolist/tasks-reducer';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {RequestStatusType} from '../app-reducer';
import {Navigate} from 'react-router-dom';

export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}


export type TasksDomainStateType = {
    [key: string]: Array<TaskDomainType>
}

type TodolistsListPropsType={
    demo?:boolean
}
export const TodolistsList = ({demo=false,...props}:TodolistsListPropsType) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksDomainStateType>(state => state.tasks);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    useEffect(() => {
        if (demo||!isLoggedIn){
            return
        }
        dispatch(fetchTodolistsTC());
    }, []);



    const dispatch = useAppDispatch();

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskTC(id, todolistId);
        dispatch(action);
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskTC(title, todolistId);
        dispatch(action);
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskTC(id, {'status': status}, todolistId);
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, title: string, todolistId: string) {
        const action = updateTaskTC(id, {'title': title}, todolistId);
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistTC(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(changeTodolistTitleTC(id, title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch]);

    if (!isLoggedIn){
        return   <Navigate to={"/login"}/>
    }
    return (<><Grid container style={{padding: '20px'}}>
        <AddItemForm addItem={addTodolist}/>
    </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                             todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>;
                })
            }
        </Grid></>);

};