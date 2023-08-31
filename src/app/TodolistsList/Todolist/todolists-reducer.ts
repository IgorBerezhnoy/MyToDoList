import {todolistsAPI, TodolistType} from '../../../api/todolists-api';
import {AppThunk} from '../../store';
import {RequestStatusType, setAppStatusAC} from '../../app-reducer';

export type ActionsTodolistsType = ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus:RequestStatusType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTodolistsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id);
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                entityStatus:"idle",
                addedDate: action.todolist.addedDate,
                order: action.todolist.order
            }, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el=>el.id==action.id?{...el,title:action.title}:el);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el=>el.id==action.id?{...el,filter:action.filter}:el);
        }
        case 'SET-TODOLIST': {
            return action.todolists.map(el => ({...el, filter: 'all',entityStatus:"idle"}));
        }
        default:
            return state;
    }
};

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const);

export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const);

export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id: id,
    title: title
} as const);

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id: id,
    filter: filter
} as const);

export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLIST', todolists} as const);

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTodolists()
        .then(res => {
            const action = setTodolistsAC(res.data);
            dispatch(action);
            dispatch(setAppStatusAC("idle"))

        });
};
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            const action = removeTodolistAC(todolistId);
            dispatch(action);
        });
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.createTodolist(title)
        .then(res => {
            const action = addTodolistAC(res.data.data.item);
            dispatch(action);
            dispatch(setAppStatusAC("idle"))
        });
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then(() => {
            const action = changeTodolistTitleAC(id, title);
            dispatch(action);
        });
};