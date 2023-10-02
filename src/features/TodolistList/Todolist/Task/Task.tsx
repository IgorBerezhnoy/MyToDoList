import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {taskAsyncActions} from './tasks-reducer';
import {useActions} from '../../../../utils/redux-utils';

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const {updateTask, removeTask,} = useActions(taskAsyncActions);
    const onClickHandler = useCallback(() => removeTask({
        taskId: props.task.id,
        todolistId: props.todolistId
    }), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            taskId: props.task.id,
            domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        });
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        updateTask({taskId: props.task.id, domainModel: {title: newValue}, todolistId: props.todolistId});
    }, [props.task.id, props.todolistId]);

    return <div style={{position: 'relative'}} key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton size={"small"} style={{position: 'absolute',  right: '2px', top: '2px'}} onClick={onClickHandler}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </div>;
});
