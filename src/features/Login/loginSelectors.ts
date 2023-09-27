import {AppRootStateType} from '../../app/store';

export const selectorIsLogin = (state:AppRootStateType) => state.login.isLoggedIn;
