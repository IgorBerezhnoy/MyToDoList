import {TaskStatuses, TaskType} from '../../../../api';
import {EditableSpan} from '../../../../components';
import React, {ChangeEvent} from 'react';
import {useActions} from '../../../../hooks/useActions';
import {Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {taskAsyncActions} from './tasks-reducer';


export const Task = React.memo(({task, todolistId}: { task: TaskType, todolistId: string }) => {
  const {removeTask: removeTaskThunk, updateTask} = useActions(taskAsyncActions);

  const removeTaskHandler = () => removeTaskThunk({taskId: task.id, todolistId: todolistId});

  const onStatusChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    let status = {status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New};
    updateTask({taskId: task.id, domainModel: status, todolistId});
  };

  const changeTitleHandler = (newValue: string) => {
    updateTask({taskId: task.id, domainModel: {title: newValue}, todolistId});
  };
  return (
    <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
      <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={onStatusChangeHandler}/>
      <EditableSpan value={task.title} onChange={changeTitleHandler}/>
      <IconButton onClick={removeTaskHandler}>
        <Delete/>
      </IconButton>
    </div>
  );
});
