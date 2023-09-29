import React from 'react';
import {Provider} from 'react-redux';
import {combineReducers} from 'redux';
import {tasksReducer} from '../../features/TodolistList/Todolist/Task/tasks-reducer';
import {todolistsReducer} from '../../features/TodolistList/Todolist/todolists-reducer';
import {v1} from 'uuid';
import {AppRootStateType, RootReducerType} from '../../app/store';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';
import {appReducer} from '../../app/app-reducer';
import thunk from 'redux-thunk';
import {MemoryRouter} from 'react-router-dom';
import {loginReducer} from '../../features/Login/login-reducer';
import {configureStore} from '@reduxjs/toolkit';

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: loginReducer
});

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'React Book',
                status: TaskStatuses.Completed,
                todoListId: 'todolistId2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        status: 'idle',
        error: null,
        initialized: false
    },
    login: {
        isLoggedIn: false
    }

};

export const storyBookStore = configureStore(
    {
        reducer: rootReducer,
        preloadedState: initialGlobalState,
        middleware:getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
    });

// export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <MemoryRouter>
        <Provider
            store={storyBookStore}>{storyFn()}
        </Provider>
    </MemoryRouter>
);
