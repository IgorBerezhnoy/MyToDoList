import {TodolistDomainType,} from '../features/TodolistList/Todolist/todolists-reducer';
import {tasksReducer, todolistAsyncActions, todolistsReducer} from '../features/TodolistList';
import {TasksStateType} from '../features/TodolistList/TodolistsList';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist = {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0};
    const action = todolistAsyncActions.addTodolist.fulfilled({todolist}, '', todolist.title);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
