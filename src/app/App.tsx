import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from './TodolistsList/TodolistsList';
import {CircularProgress, LinearProgress} from '@mui/material';
import ErrorSnackBar from '../components/ErrorSnackBar/ErrorSnackBar';
import {useSelector} from 'react-redux';
import {appSetInitializedTC} from './app-reducer';
import {useAppDispatch} from './store';
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {logOutTC} from '../features/Login/login-reducer';
import {selectors} from '../features/Login';
import {selectIsInitialized, selectStatus} from './AppSelectors';

type PropsType = { demo?: boolean }

function App({demo = false}: PropsType) {

    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(appSetInitializedTC());
    }, []);



    let appStatus = useSelector(selectStatus);
    let initialized = useSelector(selectIsInitialized);
    let isLoggedIn = useSelector(selectors.selectorIsLogin);

    let onClickLogOutHandler = useCallback(() => {
        dispatch(logOutTC());
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
