import {TaskStatuses, TaskType} from '../../../../api';
import {TodolistDomainType} from '../todolists-reducer';
import {Task} from './Task';
import React from 'react';

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