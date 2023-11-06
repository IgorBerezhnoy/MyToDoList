import {FilterValuesType, todolistActions, TodolistDomainType} from '../../../model/todolists/todolistsSlice';
import {useActions} from '../../../../../common/hooks/useActions';
import React, {useCallback} from 'react';
import {PropTypes} from '@mui/material';
import {Button} from '@material-ui/core';

type Props = {
  todolist: TodolistDomainType
}
export const FilterTaskButton = ({todolist}: Props) => {
  const {id} = todolist;
  const {changeTodolistFilter} = useActions(todolistActions);
  const onFilterClickHandler = (filter: FilterValuesType) => changeTodolistFilter({filter, todolistId: id});

  const renderButton = (color: PropTypes.Color, name: string, filter: FilterValuesType) => {
    return (<Button variant={todolist.filter === filter ? 'outlined' : 'text'}
                    onClick={() => onFilterClickHandler(filter)}
                    color={color}>{name}</Button>);
  };
  return (
    <>  {renderButton('default', 'All', 'all')}
      {renderButton('primary', 'Active', 'active')}
      {renderButton('secondary', 'completed', 'completed')}
    </>
  );
};