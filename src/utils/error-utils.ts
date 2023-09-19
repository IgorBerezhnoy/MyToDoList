import {appSetErrorAC} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {AppActionsType} from '../app/store';
import {Dispatch} from 'react';

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch<AppActionsType>) => {
    if (res.messages.length) {
        dispatch(appSetErrorAC({error:res.messages[0]}));
    } else {
        dispatch(appSetErrorAC({error:'some error'}));
    }
};
export const handleServerNetworkError = <D>(error: {message:string}, dispatch: Dispatch<AppActionsType>) => {
    dispatch(appSetErrorAC({error:error.message ? error.message : 'some error'}));

};