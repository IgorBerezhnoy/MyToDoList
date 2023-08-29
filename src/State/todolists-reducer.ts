import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {AppThunk} from './store';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type SetTodolistType = ReturnType<typeof setTodolistsAC>

export type ActionsTodolistsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistType

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
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
                addedDate: action.todolist.addedDate,
                order: action.todolist.order
            }, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        case 'SET-TODOLIST': {
            return action.todolists.map(el => ({...el, filter: 'all'}));
        }
        default:
            return state;
    }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId};
};
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist};
};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title};
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter};
};


export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLIST', todolists} as const;
};


export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => {
            const action = setTodolistsAC(res.data);
            dispatch(action);
        });
};
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(res => {
            const action = removeTodolistAC(todolistId);
            dispatch(action);
        });
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            const action = addTodolistAC(res.data.data.item);
            dispatch(action);
        });
};
export const changeTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then(res => {
            const action = changeTodolistTitleAC(id, title);
            dispatch(action);
        });
};