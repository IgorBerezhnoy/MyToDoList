import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from './TodolistsList/TodolistsList';
import {LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorShackBar/ErrorShackBar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';


function App() {
let status=useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
                {status==="loading"   &&<LinearProgress/>}
            </AppBar>
            <Container fixed>
                <ErrorSnackbar/>
                <TodolistsList/>

            </Container>
        </div>
    );
}

export default App;
