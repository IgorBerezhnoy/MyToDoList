import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {appActions, selectorsApp} from '../../features/Application';
import {useActions} from '../../utils/redux-utils';


export default function ErrorSnackBar() {

    let isError = useSelector(selectorsApp.selectError);
    const {appSetErrorAC} = useActions(appActions);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        appSetErrorAC({error: null});
    };

    return (
        <Snackbar open={!!isError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {isError}
            </Alert>
        </Snackbar>

    );
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});