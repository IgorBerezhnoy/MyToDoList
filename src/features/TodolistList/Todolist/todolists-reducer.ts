import {todolistsApi, TodolistType} from '../../../api/todolists-api';
import {appSetStatusAC, RequestStatusType} from '../../Application/app-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

const initialState: Array<TodolistDomainType> = [];

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

export const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) {
            let todolistIndex = state.findIndex(tl => tl.id === action.payload.todolistId);
            state[todolistIndex].filter = action.payload.filter;
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            let todolistIndex = state.findIndex(tl => tl.id === action.payload.id);
            state[todolistIndex].entityStatus = action.payload.status;
        },

        clearDataAC() {
            return [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                let todolistIndex = state.findIndex(tl => tl.id === action.payload.id);
                state[todolistIndex].title = action.payload.title;
            })
            .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}));
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                state.unshift({
                    id: action.payload.todolist.id,
                    title: action.payload.todolist.title,
                    filter: 'all',
                    addedDate: action.payload.todolist.addedDate,
                    order: action.payload.todolist.order, entityStatus: 'idle'
                });
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                let todolistIndex = state.findIndex(tl => tl.id === action.payload.todolistId);
                if (todolistIndex > -1) {
                    state.splice(todolistIndex, 1);
                }
            });
    }
});

export const todolistsReducer = slice.reducer;
export const {
    changeTodolistFilter,
    changeTodolistEntityStatusAC,
    clearDataAC
} = slice.actions;


const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolistsTC', async (arg, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await todolistsApi.getTodolists();
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return {todolists: res.data};
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        dispatch(appSetStatusAC({status: 'succeeded'}));
        return thunkAPI.rejectWithValue({todolists: {}});
    }
});
const removeTodolist = createAsyncThunk('todolists/removeTodolistsTC',
    async (todolistId: string, thunkAPI) => {
        let {dispatch, extra} = thunkAPI;
        //await extra.api.delete('')
        dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}));
        dispatch(appSetStatusAC({status: 'loading'}));
        try {
            let res = await todolistsApi.deleteTodolist(todolistId);
            if (res.data.resultCode === 0) {
                dispatch(appSetStatusAC({status: 'succeeded'}));
                return {todolistId};
            } else {
                handleServerAppError(res.data, dispatch);
                return thunkAPI.rejectWithValue({});
            }
        } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            dispatch(appSetStatusAC({status: 'failed'}));
            return thunkAPI.rejectWithValue({});
        }
    });
const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string>('todolists/addTodolistTC', async (title: string, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await todolistsApi.createTodolist(title);
        if (res.data.resultCode === 0) {
            dispatch(appSetStatusAC({status: 'succeeded'}));
            return {todolist: res.data.data.item};
        } else {
            console.log(res)
            handleServerAppError(res.data, dispatch);

            return thunkAPI.rejectWithValue({})
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        dispatch(appSetStatusAC({status: 'failed'}));
        return thunkAPI.rejectWithValue('');
    }
});
const changeTodolistTitleTC = createAsyncThunk<{ id: string, title: string }, { id: string, title: string }>
('todolists/changeTodolistTitleTC', async ({id, title}, thunkAPI) => {
    let {dispatch} = thunkAPI;
    dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}));
    dispatch(appSetStatusAC({status: 'loading'}));
    try {
        let res = await todolistsApi.updateTodolist(id, title);
        if (res.data.resultCode === 0) {
            return {id, title};
        } else {
            handleServerAppError(res.data, dispatch);
            return thunkAPI.rejectWithValue({});
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch);
        return thunkAPI.rejectWithValue({});
    } finally {
        dispatch(appSetStatusAC({status: 'succeeded'}));
        dispatch(changeTodolistEntityStatusAC({id, status: 'idle'}));
    }

});

export let todolistAsyncActions = {
    fetchTodolistsTC,
    removeTodolist,
    addTodolist,
    changeTodolistTitleTC,
};
export const todolistActions = {...slice.actions, ...todolistAsyncActions};


export type ActionsTodolistsType =
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTodolistEntityStatusAC>
    | ReturnType<typeof clearDataAC>




// setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
//     return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}));
// },

// removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
//     let todolistIndex = state.findIndex(tl => tl.id === action.payload.todolistId);
//     if (todolistIndex > -1) {
//         state.splice(todolistIndex, 1);
//     }
// },
// addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
//     state.unshift({
//         id: action.payload.todolist.id,
//         title: action.payload.todolist.title,
//         filter: 'all',
//         addedDate: action.payload.todolist.addedDate,
//         order: action.payload.todolist.order, entityStatus: 'idle'
//     });
// },
// changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
//     let todolistIndex = state.findIndex(tl => tl.id === action.payload.id);
//     state[todolistIndex].title = action.payload.title;
// },

// export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
//     dispatch(appSetStatusAC({status: 'loading'}));
//     todolistsApi.createTodolist(title)
//         .then(res => {
//             const action = addTodolistAC({todolist: res.data.data.item});
//             dispatch(action);
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
//         .finally(() => {
//             dispatch(appSetStatusAC({status: 'succeeded'}));
//         });
// };
// export const _changeTodolistTitleTC = (id: string, title: string): AppThunk => (dispatch) => {
//     dispatch(changeTodolistEntityStatusAC({id, status: 'loading'}));
//     dispatch(appSetStatusAC({status: 'loading'}));
//     todolistsApi.updateTodolist(id, title)
//         .then(() => {
//             const action = changeTodolistTitleAC({id, title});
//             dispatch(action);
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
//         .finally(() => {
//             dispatch(appSetStatusAC({status: 'succeeded'}));
//             dispatch(changeTodolistEntityStatusAC({id, status: 'idle'}));
//         });
// };

//
// export const _removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
//     dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}));
//     dispatch(appSetStatusAC({status: 'loading'}));
//     todolistsApi.deleteTodolist(todolistId)
//         .then(() => {
//             const action = removeTodolistAC({todolistId});
//             dispatch(action);
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
//         .finally(() => {
//             dispatch(appSetStatusAC({status: 'succeeded'}));
//         });
// };
//
// export const _fetchTodolistsTC = (): AppThunk => (dispatch) => {
//     dispatch(appSetStatusAC({status: 'loading'}));
//     todolistsApi.getTodolists()
//         .then(res => {
//             const action = setTodolistsAC({todolists: res.data});
//             dispatch(action);
//         })
//         .catch(error => {
//             handleServerNetworkError(error, dispatch);
//         })
//         .finally(() => {
//                 dispatch(appSetStatusAC({status: 'succeeded'}));
//             }
//         );
// };


//     (state: Array<TodolistDomainType> = initialState, action: ActionsTodolistsType): Array<TodolistDomainType> => {
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
//                 order: action.todolist.order, entityStatus:"idle"
//             }, ...state];
//         }
//         case 'CHANGE-TODOLIST-TITLE': {
//             return state.map(el=>el.id==action.id?{...el,title:action.title}:el);
//         }
//         case 'CHANGE-TODOLIST-FILTER': {
//             return state.map(el=>el.id==action.id?{...el,filter:action.filter}:el);
//         }
//         case 'CHANGE-TODOLIST-ENTITY-STATUS': {
//             return state.map(el=>el.id==action.id?{...el,entityStatus:action.status}:el);
//         }
//         case 'SET-TODOLIST': {
//             return action.todolists.map(el => ({...el, filter: 'all', entityStatus:'idle'}));
//         }
//         default:
//             return state;
//     }
// };

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
    ;
