import {todolistActions, TodolistDomainType} from '../../model/todolists/todolistsSlice';
import {useActions} from '../../../../common/hooks/useActions';

import {EditableSpan} from '../../../../common/components';
import React, {useCallback} from 'react';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

export let TodolistTitle = ({todolist}: { todolist: TodolistDomainType }) => {
  const {id, title} = todolist;
  const {removeTodolist, changeTodolistTitleTC} = useActions(todolistActions);
  const changeTodolistTitle = useCallback((title: string) => changeTodolistTitleTC({id, title}), [id]);

  return (<h3>
    {/*  TODO inline style*/}
    <IconButton size={'small'} style={{
      position: 'absolute', right: '10px', top: '5px'
    }}
                disabled={todolist.entityStatus == 'loading'}
                onClick={() => removeTodolist(id)}>
      <Delete fontSize={'small'}/>
    </IconButton>
    <EditableSpan value={title} onChange={changeTodolistTitle}/>
  </h3>);
};