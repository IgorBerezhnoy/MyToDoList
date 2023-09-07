import {appReducer, appSetErrorAC, appSetStatusAC, InitialStateType} from '../app/app-reducer';

let startState:InitialStateType
beforeEach(() => {
    startState={
       status:'loading',
       error: null
   }
});

test('correct error should be removed', () => {
    const endState = appReducer(startState, appSetErrorAC("null"));

    expect(endState.error).toBe("null");
});
test('correct status should be removed', () => {
    const endState = appReducer(startState, appSetStatusAC("idle"));

    expect(endState.status).toBe("idle");
});
