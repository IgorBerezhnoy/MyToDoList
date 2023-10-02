import {useMemo} from 'react';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {useDispatch} from 'react-redux';
import {DispatchFunc} from './types';


export const useAppDispatch: DispatchFunc = useDispatch;


export function useActions<T extends ActionCreatorsMapObject>(actions: T) {
    const dispatch = useAppDispatch();
    return useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, []);
}