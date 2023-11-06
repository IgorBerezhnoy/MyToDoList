import React from 'react';
import {action} from '@storybook/addon-actions';
import {Task} from '../features/TodolistList/ui/Todolist/Tasks/Task/Task';
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator';
import {TaskPriorities, TaskStatuses} from '../common/enums';

export default {
    title: 'Task Stories',
    component: Task,
    decorators:[ReduxStoreProviderDecorator]
};

const removeCallback = action('Remove Button inside Task clicked');
const changeStatusCallback = action('Status changed inside Task');
const changeTitleCallback = action('Title changed inside Task');

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task
                task={{
                    id: '1', status: TaskStatuses.Completed, title: 'CSS', todoListId: 'todolistId1', description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                }}

                todolistId={'todolistId1'}
            />
            <Task
                task={{
                    id: '2', status: TaskStatuses.New, title: 'JS', todoListId: 'todolistId1', description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                }}

                todolistId={'todolistId2'}
            />
        </div>);
};
