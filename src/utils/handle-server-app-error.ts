import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'react';
import {AppActionsType} from './types';
import {appSetErrorAC, appSetStatusAC} from '../features/Application';

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch<AppActionsType>) => {
  if (res.messages.length) {
    dispatch(appSetErrorAC({error: res.messages[0]}));
  } else {
    dispatch(appSetErrorAC({error: 'some error'}));
  }
  dispatch(appSetStatusAC({status: 'failed'}));
};