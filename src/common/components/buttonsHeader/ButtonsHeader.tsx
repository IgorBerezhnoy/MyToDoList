import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useActions } from "../../hooks";
import { asyncLoginActions, selectors } from "../../../features/auth";
import { Button } from "@mui/material";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LightModeIcon from "@mui/icons-material/LightMode";
import "../../../app/App.css";

export type isLightModeType = "light" | "dark";
type PropsType = {
  isLightMode: boolean;
  setIsLightMode: (mode: boolean) => void;
};
export let ButtonsHeader = ({ setIsLightMode, isLightMode }: PropsType) => {
  const { logOutTC } = useActions(asyncLoginActions);
  let isLoggedIn = useSelector(selectors.selectorIsLogin);

  let onClickLogOutHandler = useCallback(() => {
    logOutTC();
  }, []);

  return (
    <div className={"toolbar__buttons"}>
      <Button
        sx={{ margin: "10px" }}
        variant={"contained"}
        color={"secondary"}
        onClick={() => setIsLightMode(!isLightMode)}
      >
        {isLightMode ? <NightlightIcon /> : <LightModeIcon />}
      </Button>
      {isLoggedIn && (
        <Button
          variant={"outlined"}
          color={"inherit"}
          style={{ width: "100px" }}
          onClick={onClickLogOutHandler}
        >
          Log Out
        </Button>
      )}
    </div>
  );
};
