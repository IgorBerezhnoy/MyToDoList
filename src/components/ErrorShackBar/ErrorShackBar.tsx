import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {setAppErrorAC, RequestStatusType} from '../../app/app-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
    let dispatch=useDispatch()
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isOpen = error !== null;

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        // if (reason === 'clickaway') {
        //     return;
        // }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>

    );
}

{/*<Button variant="outlined" onClick={handleClick}>*/
}
{/*    Open success snackbar*/
}
{/*</Button>*/
}

{/*<Alert severity="error">This is an error message!</Alert>*/
}
{/*<Alert severity="warning">This is a warning message!</Alert>*/
}
{/*<Alert severity="info">This is an information message!</Alert>*/
}
{/*<Alert severity="success">This is a success message!</Alert>*/
}