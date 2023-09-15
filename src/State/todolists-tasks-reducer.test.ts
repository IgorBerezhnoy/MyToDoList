import {addTodolistAC, TodolistDomainType, todolistsReducer} from '../app/TodolistsList/Todolist/todolists-reducer';
import {tasksReducer} from '../app/TodolistsList/Todolist/tasks-reducer';
import {TasksStateType} from '../app/TodolistsList/TodolistsList';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist = {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0};
    const action = addTodolistAC({todolist});

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
