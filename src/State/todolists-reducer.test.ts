import {setTodolistsAC, TodolistDomainType, todolistsReducer} from './todolists-reducer';

test("todolists should be set rhe state",()=>{
    const initialState: Array<TodolistDomainType> = [
        {id: "todolistId1", title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: "todolistId2", title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ];
    let state
    const action=setTodolistsAC(initialState)
    state=todolistsReducer(state,action)

    expect(state.length).toBe(2)
})