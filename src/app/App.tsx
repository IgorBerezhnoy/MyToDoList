import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from './TodolistsList/TodolistsList';
import {LinearProgress} from '@mui/material';
import ErrorSnackBar from '../components/ErrorSnackBar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {RequestStatusType} from './app-reducer';
import {AppRootStateType} from './store';

type PropsType={demo?:boolean}
function App({demo = false}:PropsType) {
let appStatus=useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {appStatus==="loading"&&<LinearProgress/>}
            </AppBar>
            <Container fixed>
                <ErrorSnackBar/>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;
