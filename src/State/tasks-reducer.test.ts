import { tasksReducer, taskAsyncActions} from '../features/TodolistList/Todolist/Task/tasks-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import {TasksStateType} from '../features/TodolistList/TodolistsList';
import {todolistAsyncActions} from '../features/TodolistList/Todolist/todolists-reducer';

let {updateTask,addTask,removeTask}=taskAsyncActions
let {addTodolist,removeTodolist}=todolistAsyncActions
let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '2', title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '3', title: 'React', status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            }
        ],
        'todolistId2': [
            {
                id: '1', title: 'bread', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '2', title: 'milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            },
            {
                id: '3', title: 'tea', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low,
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTask.fulfilled({taskId: '2', todolistId: 'todolistId2'}, "", {taskId: '2', todolistId: 'todolistId2'});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    let task = {
        id: '1', title: 'juce', status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
        startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    };
    const action = addTask.fulfilled({task}, "", {title:"juce", todolistId:"todolistId2"});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
    let task = {
        title: 'CSS', status: TaskStatuses.New, description: '',
        startDate: '', deadline: '', priority: TaskPriorities.Low
    };
    const action = updateTask.fulfilled({taskId: '2', task, todolistId: 'todolistId2'},"",{taskId: '2', domainModel:task, todolistId: 'todolistId2'});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    let task = {
        title: 'juce', status: TaskStatuses.New, description: '',
        startDate: '', deadline: '', priority: TaskPriorities.Low
    };

    const action = updateTask.fulfilled({taskId: '2', task, todolistId: 'todolistId2'}, "", {taskId: '2', domainModel:task, todolistId: 'todolistId2'});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId2'][1].title).toBe('juce');
    expect(endState['todolistId2'][0].title).toBe('bread');
});
test('new array should be added when new todolist is added', () => {
    let todolist = {id: 'todolistId12', title: 'What to learn', addedDate: '', order: 0};
    const action = addTodolist.fulfilled({todolist}, "",todolist.title );

    const endState = tasksReducer(startState, action);


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added');
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolist.fulfilled({todolistId: 'todolistId2'},"", 'todolistId2');

    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});
