import {setTodolistsAC} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

test("empty arrays should be added when we set todolists",()=>{
    const action= setTodolistsAC([
        {id: "todolistId1", title: 'What to learn', addedDate: '', order: 0},
        {id: "todolistId2", title: 'What to buy', addedDate: '', order: 0}
    ]);
    const endState=tasksReducer({},action)

    const keys=Object.keys(endState)


    expect(keys.length).toBe(2)
    expect(endState["todolistId1"]).toBeDefined()
    expect(endState["todolistId2"]).toBeDefined()
})