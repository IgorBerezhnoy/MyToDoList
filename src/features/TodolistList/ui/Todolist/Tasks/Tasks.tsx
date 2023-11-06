import { TaskType} from '../../../../../common/api';
import {TodolistDomainType} from '../../../model/todolists/todolistsSlice';
import {Task} from './Task/Task';
import React from 'react';
import {TaskStatuses} from '../../../../../common/enums';

export let Tasks = ({tasks, todolist}: { tasks: TaskType[], todolist: TodolistDomainType }) => {

  let tasksForTodolist = tasks;
  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed);
  }
  return <>{
    tasksForTodolist.length === 0 ? <div style={{padding: '10px', color: 'grey'}}>
        <div>No task</div>
      </div> :
      tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={todolist.id}/>)
  }</>;
};