import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TodolistsList} from './TodolistsList/TodolistsList';
import {CircularProgress, LinearProgress} from '@mui/material';
import {ErrorSnackbar} from '../components/ErrorShackBar/ErrorShackBar';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './store';
import {RequestStatusType, setAppInitializedTC} from './app-reducer';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../feachers/Login/Login';
import {logOutTC} from '../feachers/Login/auth-reducer';


type AppPropsType = {
    demo?: boolean
}

function App({demo = false, ...props}: AppPropsType) {
    let status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    let isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    let isLoggedIn=useSelector<AppRootStateType, boolean>(state =>state.auth.isLoggedIn )
    let dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setAppInitializedTC());
    }, []);

    const onLogOutHandler=useCallback(()=>{
        dispatch(logOutTC())
    },[])
    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '40%', left: '50%'}}><CircularProgress/></div>;
    }
    return (<BrowserRouter>

            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        {isLoggedIn&&<Button color="inherit" onClick={onLogOutHandler}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <ErrorSnackbar/>
                    <Routes>
                        <Route path="/" element={<TodolistsList demo={demo}/>}/>
                        <Route path="/login" element={<Login/>}/>

                        <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path="*" element="/404"/>
                    </Routes> </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;
