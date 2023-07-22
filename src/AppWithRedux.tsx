import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import {Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {

    const dispatch =useDispatch()
const todolists=useSelector<AppRootState,TodolistType[]>(state=>state.todolists)
const tasks=useSelector<AppRootState,TasksStateType>(state=>state.tasks)



    function removeTask(taskID: string, todolistId: string) {
        const action=removeTaskAC(todolistId,taskID)
        dispatch(action)
    }

    function addTask(title: string, todolistId: string) {
        const action=addTaskAC(todolistId,title)
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
const action=changeTaskStatusAC(todolistId,id,isDone)
        dispatch(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action=changeTaskTitleAC(todolistId,id,newTitle)
        dispatch(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action=ChangeTodolistFilterAC(todolistId,value)
        dispatch(action)
    }

    function removeTodolist(id: string) {
        const action=RemoveTodolistAC(id)
        dispatch(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        const action=ChangeTodolistTitleAC(id,title)
        dispatch(action)

    }

    function addTodolist(title: string) {
        debugger
        const action=AddTodolistAC(title)
        dispatch(action)

    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
