import React, {useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {Button} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';
import {addTaskAC} from './state/tasks-reducer';
import {Task} from './Task';

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

export const Todolist = React.memo((props: PropsType) => {
        console.log('todolist is called');
        let tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id]);
        let dispatch = useDispatch();


        const addTask = useCallback((title: string) => {
            dispatch(addTaskAC(title, props.id));
        }, [dispatch]);

        const removeTodolist = useCallback(() => {
            props.removeTodolist(props.id);
        }, []);
        const changeTodolistTitle = useCallback((title: string) => {
            props.changeTodolistTitle(props.id, title);
        }, []);

        const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id]);
        const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id]);
        const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id]);


        if (props.filter === 'active') {
            tasks = tasks.filter(t => !t.isDone);
        }
        if (props.filter === 'completed') {
            tasks = tasks.filter(t => t.isDone);
        }


        return <div>
            <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    tasks.map(t => <Task taskId={t.id} title={t.title} todoId={props.id} isDone={t.isDone}/>)
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
);

