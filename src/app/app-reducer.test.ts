import { appSlice, InitialStateType } from "./appSlice";
import { appSetErrorAC, appSetStatusAC } from "../features/Application";

let startState: InitialStateType;
beforeEach(() => {
  startState = {
    status: "loading",
    error: null,
    initialized: false,
    isLightMode: false,
  };
});

test("correct error should be removed", () => {
  const endState = appSlice(startState, appSetErrorAC({ error: "null" }));

  expect(endState.error).toBe("null");
});
test("correct status should be removed", () => {
  const endState = appSlice(startState, appSetStatusAC({ status: "idle" }));

  expect(endState.status).toBe("idle");
});
