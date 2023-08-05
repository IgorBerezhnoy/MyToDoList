import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {TaskType} from './Todolist';

type PropsTaskType = {
    todolistId: string
    task: TaskType
}
export const Task = React.memo((props: PropsTaskType) => {
    console.log('Task is called');


    let dispatch = useDispatch();


    const onClickHandler = useCallback(() => {
        let action = removeTaskAC(props.task.id, props.todolistId);
        dispatch(action);
    }, [dispatch, props.task.id, props.todolistId]);


    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let action = changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId);
        dispatch(action);
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        let action = changeTaskTitleAC(props.task.id, newValue, props.todolistId);
        dispatch(action);
    }, [props.task.id, props.todolistId]);


    return <div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>;
});