import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';

type PropsTaskType = {
    todolistId: string
    taskId: string
    isDone: boolean
    title: string
}
export const Task = React.memo((props: PropsTaskType) => {
    console.log('Task is called');


    let dispatch = useDispatch();


    const onClickHandler = useCallback(() => {
        let action = removeTaskAC(props.taskId, props.todolistId);
        dispatch(action);
    }, [dispatch, props.taskId, props.todolistId]);


    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let action = changeTaskStatusAC(props.taskId, newIsDoneValue, props.todolistId);
        dispatch(action);
    }, [props.taskId, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        let action = changeTaskTitleAC(props.taskId, newValue, props.todolistId);
        dispatch(action);
    }, [props.taskId, props.todolistId]);


    return <div key={props.taskId} className={props.isDone ? 'is-done' : ''}>
        <Checkbox
            checked={props.isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>;
});