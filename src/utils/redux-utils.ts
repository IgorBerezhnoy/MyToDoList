import {AppReducerActionsType} from '../app/app-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {useDispatch} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useMemo} from 'react';
import {store} from '../app/store';

export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootReducerType = typeof rootReducer

export type AppActionsType = /*ActionsTodolistsType*/ | /*ActionsTaskType | */AppReducerActionsType
export type ThunkType = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>
export type DispatchFunc = () => ThunkType
export const useAppDispatch: DispatchFunc = useDispatch;
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;


export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch();
    return useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, []);
}