import {ResponseType} from '../api';
import {Dispatch} from 'react';
import {AppActionsType} from './types';
import {appSetErrorAC, appSetStatusAC} from '../features/Application';

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch<AppActionsType>) => {
  dispatch(appSetErrorAC({error: (res.messages.length) ? res.messages[0] : 'some error'}));
  dispatch(appSetStatusAC({status: 'failed'}));
};