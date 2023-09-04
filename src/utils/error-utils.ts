import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {ThunkType} from '../app/store';

export const handelServerAppError = <D>(data: ResponseType<D>, dispatch: ThunkType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]));
    } else {
        dispatch(setAppErrorAC('Some error occurred'));
    }
};
export const handelServerNetworkError = (error: { message: string }, dispatch: ThunkType) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error'));
    dispatch(setAppStatusAC('failed'));
};