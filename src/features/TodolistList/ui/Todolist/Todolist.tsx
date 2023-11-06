import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../../common/components';
import {TaskType} from '../../../../common/api';
import {TodolistDomainType} from '../../model/todolists/todolistsSlice';
import {taskAsyncActions} from '../../index';
import {Paper} from '@mui/material';
import {useActions} from '../../../../common/hooks/useActions';
import {FilterTaskButton} from './Tasks/FilterTaskButton';
import {Tasks} from './Tasks/Tasks';
import {TodolistTitle} from './TodolistTitle';

export const Todolist = React.memo(function ({demo = false, todolist, tasks, ...props}: PropsType) {
  const {addTask, fetchTask} = useActions(taskAsyncActions);

  useEffect(() => {
    if (!demo) {
      fetchTask(todolist.id);
    }
  }, []);

  const addTaskCallback = useCallback((title: string) => {
    return addTask({title, todolistId: todolist.id}).unwrap();
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
