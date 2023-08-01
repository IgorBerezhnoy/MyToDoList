import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {Button, Checkbox} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TasksStateType} from './AppWithRedux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id]);

    let dispatch = useDispatch();


    const addTask = (title: string) => {
        let action = addTaskAC(title, props.id);
        dispatch(action);
    };

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    };
    if (props.filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {

               tasks.map(t => {

                    const onClickHandler = () => {
                        let action = removeTaskAC(t.id, props.id);
                        dispatch(action);

                    };


                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        let action = changeTaskStatusAC(t.id, newIsDoneValue, props.id);
                        dispatch(action);
                    };

                    const onTitleChangeHandler = (newValue: string) => {
                        let action = changeTaskTitleAC(t.id, newValue, props.id);
                        dispatch(action);
                    };


                    return <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>;
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>;
}


