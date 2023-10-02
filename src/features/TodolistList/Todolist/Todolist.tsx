import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {FilterValuesType, TodolistDomainType} from './todolists-reducer';
import {taskAsyncActions, todolistActions} from '../index';
import {Paper, PropTypes} from '@mui/material';
import {useActions} from '../../../utils/redux-utils';

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

export const Todolist = React.memo(function ({demo = false, ...props}: PropsType) {

    const {addTask, fetchTask} = useActions(taskAsyncActions);
    const {changeTodolistFilter, removeTodolist, changeTodolistTitleTC,} = useActions(todolistActions);
    useEffect(() => {
        if (!demo) {
            fetchTask(props.todolist.id);
        }
    }, []);
    console.log('Todolist called');

    const addTaskCallback = useCallback((title: string) => {
        return addTask({title, todolistId: props.todolist.id});
    }, [props.todolist.id]);


    const changeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitleTC({id: props.todolist.id, title: title});
    }, [props.todolist.id]);

    const onFilterClickHandler = useCallback((filter: FilterValuesType) => changeTodolistFilter({
        filter: filter,
        todolistId: props.todolist.id
    }), [props.todolist.id]);


    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const renderButton = (color: PropTypes.Color, name: string, filter: FilterValuesType) => (
        <Button variant={props.todolist.filter === filter ? 'outlined' : 'text'}
                onClick={() => onFilterClickHandler(filter)}
                color={color}>{name}</Button>);

    return <Paper style={{padding: '10px', width: '300px', position: 'relative'}}>
        <IconButton size={"small"} style={{
            position: 'absolute', right: '10px', top: '5px'
        }}
                    disabled={props.todolist.entityStatus == 'loading'}
                    onClick={() => removeTodolist(props.todolist.id)}>
            <Delete fontSize={"small"}/>
        </IconButton>
        <h3>
            <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}/>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus == 'loading'}/>
        <div>
            {
                tasksForTodolist.length === 0 ? <div style={{padding: '10px', color: 'grey'}}>
                        <div>No task</div>
                    </div> :
                    tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
        </div>

        <div style={{paddingTop: '10px'}}>
            {renderButton('default', 'All', 'all')}
            {renderButton('primary', 'Active', 'active')}
            {renderButton('secondary', 'completed', 'completed')}

        </div>
    </Paper>;
});



