import {appReducer,  InitialStateType} from '../features/Application/app-reducer';
import {appSetErrorAC, appSetStatusAC} from '../features/Application';

let startState:InitialStateType
beforeEach(() => {
    startState={
       status:'loading',
       error: null,
        initialized:false
   }
});

test('correct error should be removed', () => {
    const endState = appReducer(startState, appSetErrorAC({error:"null"}));

    expect(endState.error).toBe("null");
});
test('correct status should be removed', () => {
    const endState = appReducer(startState, appSetStatusAC({status:"idle"}));

    expect(endState.status).toBe("idle");
});
