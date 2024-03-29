import { TaskType } from "../../../common/api";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AddItemForm } from "../../../common/components";
import { Todolist } from "./Todolist/Todolist";
import { Navigate } from "react-router-dom";
import { selectorIsLogin } from "../../auth/model/loginSelectors";
import { todolistActions } from "../index";
import { selectorTodolists } from "../model/todolists/todolistsSelectors";
import { selectorTasks } from "../model/tasks/tasks-selectors";
import { AppRootStateType } from "../../../app";
import { useActions } from "../../../common/hooks";
import { Grid } from "@mui/material";
import s from "./TodolistsList.module.css";

export type TasksStateType = Record<string, TaskType[]>;

type PropsType = { demo?: boolean };

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
  let isLoggedIn = useSelector(selectorIsLogin);

  const { addTodolist, fetchTodolistsTC } = useActions(todolistActions);

  const addTodolistCallBack = (title: string) => {
    return addTodolist(title).unwrap();
  };
  const todolists = useSelector(selectorTodolists);
  const tasks = useSelector<AppRootStateType, TasksStateType>(selectorTasks);

  useEffect(() => {
    if (!demo || !isLoggedIn) {
      fetchTodolistsTC();
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={"login"} />;
  }

  return (
    <>
      <Grid container className={s.gridContainer}>
        <AddItemForm addItem={addTodolistCallBack} />
      </Grid>
      <div className={s.todolistsWrapper}>
        {todolists.map((tl) => {
          let allTodolistTasks = tasks[tl.id];
          return (
            <Grid item key={tl.id}>
              <Todolist todolist={tl} tasks={allTodolistTasks} demo={demo} />
            </Grid>
          );
        })}
      </div>
    </>
  );
};
