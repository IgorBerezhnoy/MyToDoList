import {useActions} from '../../hooks/useActions';
import {useSelector} from 'react-redux';
import {FormikHelpers, useFormik} from 'formik';
import {BaseResponseType} from '../../types';
import {LoginParamsType} from '../../api';
import {AppRootStateType} from '../../app';
import {asyncLoginActions} from './login-reducer';

export const useLogin=()=>{
  const {loginTC} = useActions(asyncLoginActions);
  const isLoggedIn = useSelector<AppRootStateType>(state => state.login.isLoggedIn);

  const formik = useFormik({
    validate: (values) => {
      const errors: FormikErrorType = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 3) {
        errors.password = 'Must be 3 characters or more';
      }
      return errors;
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      loginTC(values)
        .unwrap()
        .catch((reason: BaseResponseType) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error);
          });
        });
    },
  });
  return {formik, isLoggedIn}
}
type FormikErrorType = Partial<Omit<LoginParamsType, 'captcha'>>
