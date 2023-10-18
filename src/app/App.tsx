import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {CircularProgress, LinearProgress} from '@mui/material';
import {useSelector} from 'react-redux';
import {appActions} from '../features/Application';
import {Navigate, Route, Routes} from 'react-router-dom';
import {asyncLoginActions, Login, selectors} from '../features/Login';
import {selectorsApp} from '../features/Application';
import {TodolistsList} from '../features/TodolistList';
import {useActions} from '../utils';
import {ErrorSnackBar} from '../components';

type PropsType = { demo?: boolean }

function App({demo = false}: PropsType) {

    const {appSetInitializedTC} = useActions(appActions);
    const {logOutTC} = useActions(asyncLoginActions);
    useEffect(() => {
        appSetInitializedTC();
    }, []);

    let appStatus = useSelector(selectorsApp.selectStatus);
    let initialized = useSelector(selectorsApp.selectIsInitialized);
    let isLoggedIn = useSelector(selectors.selectorIsLogin);

    let onClickLogOutHandler = useCallback(() => {
        logOutTC();
    }, []);


    if (!initialized) {
        return <CircularProgress style={{position: 'fixed', top: '40%', left: '47%'}}/>;
    }

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
                    {isLoggedIn && <Button color="inherit" style={{position: 'absolute', left: '93%'}}
                                           onClick={onClickLogOutHandler}>Log Out</Button>}
                </Toolbar>
                {appStatus === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <ErrorSnackBar/>
                <Routes>
                    <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>

            </Container>
        </div>
    );
}

export default App;
