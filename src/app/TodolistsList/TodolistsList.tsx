import {TaskType} from '../../api/todolists-api';
import React, {useEffect} from 'react';
import {TodolistDomainType} from './Todolist/todolists-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useActions} from '../store';
import {Grid, Paper} from '@material-ui/core';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {selectorIsLogin} from '../../features/Login/loginSelectors';
import {todolistActions} from './Todolist';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type PropsType = { demo?: boolean }

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    let isLoggedIn = useSelector(selectorIsLogin);
    const {addTodolist, fetchTodolistsTC} = useActions(todolistActions);

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    // const dispatch = useAppDispatch();

    useEffect(() => {
        if (!demo || !isLoggedIn) {
            fetchTodolistsTC();
        }
    }, []);


    if (!isLoggedIn) {
        return <Navigate to={'login'}/>;
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
                                demo={demo}
                            />
                        </Paper>
                    </Grid>;
                })
            }
        </Grid></>);

};
//
// const removeTask = useCallback(function (taskId: string, todolistId: string) {
//     removeTaskTC({taskId, todolistId});
// }, []);
//
// const addTask = useCallback(function (title: string, todolistId: string) {
//     addTaskTC({title, todolistId});
// }, []);
//
//
// const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
//     updateTask({taskId, domainModel: {'status': status}, todolistId});
// }, []);
//
// const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
//     updateTask({taskId, domainModel: {'title': title}, todolistId});
// }, []);
//
// const changeFilter = useCallback(function (filter: FilterValuesType, id: string) {
//     changeTodolistFilterAC({id, filter})
// }, []);
//
// const removeTodolist = useCallback(function (id: string) {
//     removeTodolistTC(id)
// }, []);
//
// const changeTodolistTitle = useCallback(function (id: string, title: string) {
//     changeTodolistTitleTC({id, title})
// }, []);
//
// const addTodolist = useCallback((title: string) => {
//     addTodolistTC(title)
// }, [dispatch]);
