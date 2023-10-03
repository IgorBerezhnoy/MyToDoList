import {v1} from 'uuid';
import {RequestStatusType} from '../features/Application/app-reducer';
import {todolistActions, todolistsReducer} from '../features/TodolistList/';
import {FilterValuesType, TodolistDomainType} from '../features/TodolistList/Todolist/todolists-reducer';


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];
let {addTodolist, removeTodolist, changeTodolistTitleTC, fetchTodolistsTC,changeTodolistEntityStatusAC,changeTodolistFilter} = todolistActions;
beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'}
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolist.fulfilled({todolistId: todolistId1}, '', todolistId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';

    let todolist = {id: 'todolistId1', title: newTodolistTitle, addedDate: '', order: 0};
    const endState = todolistsReducer(startState, addTodolist.fulfilled(
        {todolist}, '', todolist.title
    ));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const action = changeTodolistTitleTC.fulfilled({id: todolistId2, title: newTodolistTitle}, '', {
        id: todolistId2,
        title: newTodolistTitle
    });

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const action = changeTodolistFilter({todolistId: todolistId2, filter: newFilter});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
test('correct status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';

    const action = changeTodolistEntityStatusAC({id: todolistId2, status: newStatus});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe('idle');
    expect(endState[1].entityStatus).toBe(newStatus);
});
test('todolist should be sed to the sate', () => {


    const action = fetchTodolistsTC.fulfilled({todolists: startState}, '');

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
});

