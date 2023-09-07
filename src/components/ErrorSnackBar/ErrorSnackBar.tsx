import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {appSetErrorAC} from '../../app/app-reducer';


export default function ErrorSnackBar() {
    let dispatch=useDispatch()

    let isError=useSelector<AppRootStateType, string|null>(state =>state.app.error )

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(appSetErrorAC(null))
    };

    return (
            <Snackbar open={!!isError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {isError}
                </Alert>
            </Snackbar>

    );
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});