import {ResponseType} from '../api';
import {Dispatch} from 'react';
import {AppActionsType} from '../types/types';
import {appSetErrorAC, appSetStatusAC} from '../features/Application';

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch<AppActionsType>, showError:boolean=true) => {
  if (showError){
    dispatch(appSetErrorAC({error: (res.messages.length) ? res.messages[0] : 'some error'}));
  }
  dispatch(appSetStatusAC({status: 'failed'}));
};