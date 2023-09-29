import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from '../../../../api/todolists-api';
import {useActions} from '../../../../app/store';
import {taskAsyncActions} from './tasks-reducer';

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

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>;
});
