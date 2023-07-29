import React, {ChangeEvent, useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';

export type TaskPropsType = {
    taskId: string
    todoId: string
    title: string
    isDone: boolean
}
export const Task = React.memo((props: TaskPropsType) => {


    let dispatch = useDispatch();

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId));
    }, []);

    const changeTaskStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId));
    }, []);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId));
    }, []);

    const onClickHandler = useCallback(() => removeTask(props.taskId, props.todoId), []);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(props.taskId, newIsDoneValue, props.todoId);
    }, [props.taskId, props.todoId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(props.taskId, newValue, props.todoId);
    }, [props.taskId, props.todoId]);


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