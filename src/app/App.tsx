import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {
  AppBar,
  Button,
  CircularProgress,
  Container, createTheme, CssBaseline,
  IconButton,
  LinearProgress, ThemeProvider,
  Toolbar,
  Typography
} from '@mui/material';
import {useSelector} from 'react-redux';
import {appActions} from '../features/Application';
import {Navigate, Route, Routes} from 'react-router-dom';
import {asyncLoginActions, Login, selectors} from '../features/auth';
import {selectorsApp} from '../features/Application';
import {TodolistsList} from '../features/TodolistList';
import {useActions} from '../common/utils';
import {ErrorSnackBar} from '../common/components';
import {Menu} from '@mui/icons-material';
import {amber, teal} from '@mui/material/colors';
import NightlightIcon from '@mui/icons-material/Nightlight';
import LightModeIcon from '@mui/icons-material/LightMode';


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


  const [isLightMode, setIsLightMode] = useState(false);
  const mode = isLightMode ? 'light' : 'dark';

  const customTheme = createTheme({
    palette: {
      primary: teal,
      secondary: amber,
      mode: mode
    }
  });


  if (!initialized) {
    return <CircularProgress style={{position: 'fixed', top: '40%', left: '47%'}}/>;
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
      <div className="App">
        <AppBar position="static">
          <Toolbar style={{position:"relative"}}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu/>
            </IconButton>
            <Typography variant="h6">
              News
            </Typography>

            <div  style={{position: 'absolute', right: "30px", display:'flex', alignItems: "center"}}>
              <Button sx={{margin: '10px'}}
                      variant={'contained'} color={'secondary'}
                      onClick={() => setIsLightMode(!isLightMode)}>{isLightMode ? <NightlightIcon/> :
                <LightModeIcon/>}
              </Button>
              {isLoggedIn && <Button variant={'outlined'} color={'inherit'} style={{width:"100px"}}
                                     onClick={onClickLogOutHandler}>Log Out</Button>}
            </div>
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
    </ThemeProvider>
  );
}

export default App;
