import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppActionsType, AppThunkType} from './store';


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist:TodolistType
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
export type SetTodolistsActionType = {
    type: 'SET-TODOLIST',
    todolists: TodolistType[]
}

export type TodolistsActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistsActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
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
            return action.todolists.map((el) => {
                return {
                    ...el,
                    filter: 'all'
                };
            });
        }
        default:
            return state;
    }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId};
};
export const addTodolistAC = (todolist:TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist};
};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title};
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter};
};
export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return {type: 'SET-TODOLIST', todolists};
};

// export const fetchTodolistsThunk=()=>(dispatch:Dispatch)=>{
//     todolistsAPI.getTodolists()
//         .then((res)=>{
//             dispatch(setTodolistsAC(res.data))
//         })
// }

export const fetchTodolistsTC = ():AppThunkType => {
    return (dispatch) => todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
        });
};

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then(() => {
            const action = removeTodolistAC(todolistId);

            dispatch(action);
        });
};
export const addTodolistTC = (title: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.createTodolist(title)
        .then(res => {
            const action = addTodolistAC(res.data.data.item);

            dispatch(action);
        });
};
export const changeTodolistTitleTC = (id:string,title: string) => (dispatch: Dispatch<AppActionsType>) => {
    todolistsAPI.updateTodolist(id,title)
        .then(res => {
            const action = changeTodolistTitleAC(id,title);

            dispatch(action);
        });
};