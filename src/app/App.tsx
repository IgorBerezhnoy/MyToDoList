import React, { useEffect } from "react";
import "./App.css";
import {
  AppBar,
  CircularProgress,
  createTheme,
  CssBaseline,
  IconButton,
  LinearProgress,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { appActions, selectorsApp } from "../features/Application";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/auth";
import { TodolistsList } from "../features/TodolistList";
import { useActions } from "../common/utils";
import { ErrorSnackBar } from "../common/components";
import { Menu } from "@mui/icons-material";
import {
  ButtonsHeader,
  isLightModeType,
} from "../common/components/buttonsHeader/ButtonsHeader";
import { amber, teal } from "@mui/material/colors";

type PropsType = {
  demo?: boolean;
};

function App({ demo = false }: PropsType) {
  const { appSetInitializedTC, setIsLightMode } = useActions(appActions);
  useEffect(() => {
    appSetInitializedTC();
  }, []);

  let appStatus = useSelector(selectorsApp.selectStatus);
  let initialized = useSelector(selectorsApp.selectIsInitialized);
  let isLightMode = useSelector(selectorsApp.isLightMode);
  const mode: isLightModeType = isLightMode ? "light" : "dark";
  const customTheme = createTheme({
    palette: {
      primary: teal,
      secondary: amber,
      mode: mode,
    },
  });

  if (!initialized) {
    return <CircularProgress className={"circularProgress"} />;
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div className="App">
        <AppBar position="static">
          <Toolbar className={"toolbar"}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>

            <ButtonsHeader
              setIsLightMode={setIsLightMode}
              isLightMode={isLightMode}
            />
          </Toolbar>
          {appStatus === "loading" && <LinearProgress />}
        </AppBar>
        <div className={"allComponents"}>
          <ErrorSnackBar />
          <Routes>
            <Route path={"/"} element={<TodolistsList demo={demo} />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
            <Route path={"*"} element={<Navigate to={"/404"} />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
