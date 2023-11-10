import {FilterValuesType, todolistActions, TodolistDomainType} from '../../../model/todolists/todolistsSlice';
import {useActions} from '../../../../../common/hooks';
import React from 'react';
import {Button} from '@mui/material';

type Props = {
  todolist: TodolistDomainType
}
type Type = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined;
export const FilterTaskButton = ({todolist}: Props) => {
  const {id} = todolist;
  const {changeTodolistFilter} = useActions(todolistActions);
  const onFilterClickHandler = (filter: FilterValuesType) => changeTodolistFilter({filter, todolistId: id});

  const renderButton = (color: Type, name: string, filter: FilterValuesType) => {
    return (<Button variant={todolist.filter === filter ? 'outlined' : 'text'} color={color}
                    onClick={() => onFilterClickHandler(filter)}
                    >{name}</Button>);
  };
  return (
    <div className={'buttons-block'}>  {renderButton('inherit', 'All', 'all')}
      {renderButton('primary', 'Active', 'active')}
      {renderButton('secondary', 'completed', 'completed')}
    </div>
  );
};