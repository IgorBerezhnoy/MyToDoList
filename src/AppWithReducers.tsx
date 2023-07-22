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


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasksReducer] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });


    function removeTask(taskID: string, todolistId: string) {
        const action=removeTaskAC(todolistId,taskID)
        dispatchTasksReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action=addTaskAC(todolistId,title)
        dispatchTasksReducer(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
const action=changeTaskStatusAC(todolistId,id,isDone)
        dispatchTasksReducer(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action=changeTaskTitleAC(todolistId,id,newTitle)
        dispatchTasksReducer(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action=ChangeTodolistFilterAC(todolistId,value)
        dispatchTodolistsReducer(action)
    }

    function removeTodolist(id: string) {
        const action=RemoveTodolistAC(id)
        dispatchTodolistsReducer(action)
        dispatchTasksReducer(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        const action=ChangeTodolistTitleAC(id,title)
        dispatchTodolistsReducer(action)
    }

    function addTodolist(title: string) {
        debugger
        const action=AddTodolistAC(title)
        dispatchTasksReducer(action)
        dispatchTodolistsReducer(action)
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

export default AppWithReducers;
