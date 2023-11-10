import React from 'react';
import {Navigate} from 'react-router-dom';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {useLogin} from '../../lib/useLogin';
import './login.css';

export const Login = () => {
  let {formik, isLoggedIn} = useLogin();
  if (isLoggedIn) {
    return <Navigate to={'/'}/>;
  }

  return (
    <Grid container justifyContent="center">
      <Grid item xs={4}>
        <div className={"login_wrapper"}>
          <div className="background">
            <div className="shape"></div>
            <div className="shape"></div>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <h3>Login Here</h3>
            <FormControl>
              <FormLabel>


                <p> Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </FormLabel>
              <FormGroup>
                <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email && <p className={'error'}>{formik.errors.email}</p>}
                <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')} />
                {formik.touched.password && formik.errors.password &&
                  <p className={'error'}>{formik.errors.password}</p>}
                <FormControlLabel
                  label={'Remember me'}
                  control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                     checked={formik.values.rememberMe}/>}/>
                <Button className={'button'}
                        type={'submit'}
                        variant={'contained'}
                        disabled={!(formik.isValid && formik.dirty)}
                        color={'primary'}>Login</Button>
                <div className="social">
                  <div className="go"><i className="fab fa-google"></i> Google</div>
                  <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
                </div>
              </FormGroup>
            </FormControl>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};
