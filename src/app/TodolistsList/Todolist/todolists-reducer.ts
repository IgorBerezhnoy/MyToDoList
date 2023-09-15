import {todolistsApi, TodolistType} from '../../../api/todolists-api';
import {AppThunk} from '../../store';
import {appSetStatusAC, RequestStatusType} from '../../app-reducer';
import {handleServerNetworkError} from '../../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ActionsTodolistsType = ReturnType<typeof removeTodolistAC> | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof changeTodolistEntityStatusAC>

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

let slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            let todoIndex=state.findIndex(el => el.id == action.payload.todolistId)
            state.splice(todoIndex,1)

        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                filter: 'all',
                addedDate: action.payload.todolist.addedDate,
                order: action.payload.todolist.order, entityStatus: 'idle'
            });
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ todolistId: string, title: string }>) {
            let todoIndex=state.findIndex(el => el.id == action.payload.todolistId)
            state[todoIndex].title=action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            let todoIndex=state.findIndex(el => el.id == action.payload.id)
            state[todoIndex].filter=action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) {
            let todoIndex=state.findIndex(el => el.id == action.payload.todolistId)
            state[todoIndex].entityStatus=action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}));
        }
    }
});
export const todolistsReducer = slice.reducer;
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    setTodolistsAC
} = slice.actions;

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    todolistsApi.getTodolists()
        .then(res => {
            const action = setTodolistsAC({todolists: res.data});
            dispatch(action);
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => {
                dispatch(appSetStatusAC({status: 'succeeded'}));
            }
        );
};
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
    dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}));
    dispatch(appSetStatusAC({status: 'loading'}));
    todolistsApi.deleteTodolist(todolistId)
        .then(() => {
            const action = removeTodolistAC({todolistId});
            dispatch(action);
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(appSetStatusAC({status: 'succeeded'}));
        });
};
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
    dispatch(appSetStatusAC({status: 'loading'}));
    todolistsApi.createTodolist(title)
        .then(res => {
            const action = addTodolistAC({todolist: res.data.data.item});
            dispatch(action);
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(appSetStatusAC({status: 'succeeded'}));
        });
};
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    dispatch(changeTodolistEntityStatusAC({todolistId, status: 'loading'}));
    dispatch(appSetStatusAC({status: 'loading'}));
    todolistsApi.updateTodolist(todolistId, title)
        .then(() => {
            const action = changeTodolistTitleAC({todolistId, title});
            dispatch(action);
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
        .finally(() => {
            dispatch(appSetStatusAC({status: 'succeeded'}));
            dispatch(changeTodolistEntityStatusAC({todolistId, status: 'idle'}));
        });
};

// export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const);
// export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const);
// export const changeTodolistTitleAC = (id: string, title: string) => ({
//     type: 'CHANGE-TODOLIST-TITLE',
//     id: id,
//     title: title
// } as const);
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
//     type: 'CHANGE-TODOLIST-FILTER',
//     id: id,
//     filter: filter
// } as const);
// export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
//     type: 'CHANGE-TODOLIST-ENTITY-STATUS',
//     id: id,
//     status
// } as const);
// export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLIST', todolists} as const);

// export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsTodolistsType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST': {
//             return state.filter(tl => tl.id != action.id);
//         }
//         case 'ADD-TODOLIST': {
//             return [{
//                 id: action.todolist.id,
//                 title: action.todolist.title,
//                 filter: 'all',
//                 addedDate: action.todolist.addedDate,
//                 order: action.todolist.order, entityStatus: 'idle'
//             }, ...state];
//         }
//         case 'CHANGE-TODOLIST-TITLE': {
//             return state.map(el => el.id == action.id ? {...el, title: action.title} : el);
//         }
//         case 'CHANGE-TODOLIST-FILTER': {
//             return state.map(el => el.id == action.id ? {...el, filter: action.filter} : el);
//         }
//         case 'CHANGE-TODOLIST-ENTITY-STATUS': {
//             return state.map(el => el.id == action.id ? {...el, entityStatus: action.status} : el);
//         }
//         case 'SET-TODOLIST': {
//             return action.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}));
//         }
//         default:
//             return state;
//     }
// };