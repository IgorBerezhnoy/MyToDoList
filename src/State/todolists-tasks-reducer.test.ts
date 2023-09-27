import {TodolistDomainType, todolistsReducer} from '../app/TodolistsList/Todolist/todolists-reducer';
import {tasksReducer} from '../app/TodolistsList/Todolist/tasks-reducer';
import {TasksStateType} from '../app/TodolistsList/TodolistsList';
import {addTodolistTC} from '../app/TodolistsList/Todolist/todolists-actions';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    let todolist = {id: 'todolistId1', title: 'What to learn', addedDate: '', order: 0};
    const action = addTodolistTC.fulfilled({todolist},"", todolist.title);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
