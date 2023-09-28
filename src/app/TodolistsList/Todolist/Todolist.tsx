import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {TodolistDomainType} from './todolists-reducer';
import {useActions, useAppDispatch} from '../../store';
import {taskAsyncActions, todolistActions} from './index';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean

}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const {addTask, updateTask, removeTask,fetchTask} = useActions(taskAsyncActions);
    const {changeTodolistFilter, removeTodolist, changeTodolistTitleTC,} = useActions(todolistActions);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!demo) {
            fetchTask(props.todolist.id)
        }
    }, []);
    console.log('Todolist called');


    const changeStatus = useCallback(function (taskId: string, status: TaskStatuses, todolistId: string) {
        updateTask({taskId, domainModel: {'status': status}, todolistId});
    }, []);

    const changeTaskTitle = useCallback(function (taskId: string, title: string, todolistId: string) {
        updateTask({taskId, domainModel: {'title': title}, todolistId});
    }, []);


    const addTaskCallback = useCallback((title: string) => {
        addTask({title, todolistId: props.todolist.id});
    }, [props.todolist.id]);


    const changeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: title});
    }, [props.todolist.id]);

    const onAllClickHandler = useCallback(() => changeTodolistFilter({
        filter: 'all',
        todolistId: props.todolist.id
    }), [props.todolist.id]);
    const onActiveClickHandler = useCallback(() => changeTodolistFilter({
        filter: 'active',
        todolistId: props.todolist.id
    }), [props.todolist.id]);
    const onCompletedClickHandler = useCallback(() => changeTodolistFilter({
        filter: 'completed',
        todolistId: props.todolist.id
    }), [props.todolist.id]);


    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
            <IconButton disabled={props.todolist.entityStatus == 'loading'}
                        onClick={() => removeTodolist(props.todolist.id)}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus == 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}
                                                removeTask={removeTask}
                                                changeTaskTitle={changeTaskTitle}
                                                changeTaskStatus={changeStatus}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>;
});


