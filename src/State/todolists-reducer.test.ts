import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from '../app/TodolistsList/Todolist/todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from '../app/app-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus:"idle" },
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus:"idle" }
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC({todolistId:todolistId1}));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle = 'New Todolist';

    let todolist = {id: 'todolistId1', title: newTodolistTitle, addedDate: '', order: 0};
    const endState = todolistsReducer(startState, addTodolistAC(
        {todolist}
    ));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';

    const action = changeTodolistTitleAC({todolistId:todolistId2,title: newTodolistTitle});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';

    const action = changeTodolistFilterAC({id:todolistId2, filter:newFilter});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
test('correct status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';

    const action = changeTodolistEntityStatusAC({todolistId:todolistId2, status:newStatus});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});
test('todolist should be sed to the sate', () => {


    const action = setTodolistsAC({todolists:startState});

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
});

