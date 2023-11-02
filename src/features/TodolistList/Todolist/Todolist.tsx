import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components';
import {TaskType} from '../../../api';
import {TodolistDomainType} from './todolists-reducer';
import {taskAsyncActions} from '../index';
import {Paper} from '@mui/material';
import {useActions} from '../../../hooks/useActions';
import {FilterTaskButton} from './FilterTaskButton';
import {Tasks} from './Task/Tasks';
import {TodolistTitle} from './TodolistTitle';

export const Todolist = React.memo(function ({demo = false, todolist, tasks, ...props}: PropsType) {
  const {addTask, fetchTask} = useActions(taskAsyncActions);

  useEffect(() => {
    if (!demo) {
      fetchTask(todolist.id);
    }
  }, []);

  const addTaskCallback = useCallback((title: string) => {
    return addTask({title, todolistId: todolist.id});
  }, [todolist.id]);

  {/*  TODO inline style*/
  }

  return <Paper style={{padding: '10px', width: '300px', position: 'relative'}}>
    <TodolistTitle todolist={todolist}/>
    <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus == 'loading'}/>
    <Tasks tasks={tasks} todolist={todolist}/>
    <div style={{paddingTop: '10px'}}>
      <FilterTaskButton todolist={todolist}/>
    </div>
  </Paper>;
});

type PropsType = {
  todolist: TodolistDomainType
  tasks: Array<TaskType>
  demo?: boolean
}
