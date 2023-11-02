import {TaskType} from '../../api';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Grid} from '@material-ui/core';
import {AddItemForm} from '../../components';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {selectorIsLogin} from '../Login/loginSelectors';
import {todolistActions} from './index';
import {selectorTodolists} from './Todolist/todolist-selectors';
import {selectorTasks} from './Todolist/Task/tasks-selectors';
import {AppRootStateType} from '../../app';
import {useActions} from '../../hooks/useActions';

export type TasksStateType = Record<string, TaskType[]>

type PropsType = { demo?: boolean }

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
  let isLoggedIn = useSelector(selectorIsLogin);

  const {addTodolist, fetchTodolistsTC} = useActions(todolistActions);

  const todolists = useSelector(selectorTodolists);
  const tasks = useSelector<AppRootStateType, TasksStateType>(selectorTasks);

  useEffect(() => {
    if (!demo || !isLoggedIn) {
      fetchTodolistsTC();
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={'login'}/>;
  }

  return (<><Grid container style={{padding: '20px'}}>
    <AddItemForm addItem={addTodolist}/>
  </Grid>
    <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
      {/*TODO Текущий вариант не очень Переделать потом*/}
      {/*TODO Fix inline Style  */}
      {/*<Grid container spacing={3}}>*/}
      {
        todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id];
          return <Grid item key={tl.id}>
            <Todolist todolist={tl} tasks={allTodolistTasks} demo={demo}/>
          </Grid>;
        })}</Grid></>);
};
