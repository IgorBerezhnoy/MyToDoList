import * as taskActions from "./task-actions"
import * as todolistAsyncActions from "./todolists-actions"
import { changeTodolistFilterAC, changeTodolistEntityStatusAC}  from "./todolists-reducer"
const todolistActions={...todolistAsyncActions, changeTodolistEntityStatusAC, changeTodolistFilterAC}
export {taskActions,todolistActions}