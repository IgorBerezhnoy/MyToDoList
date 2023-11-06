
import {instance} from './instance';
import {BaseResponseType} from '../types';

export const authApi = {
  auth(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId: number }>>('auth/login', data);
  },
  logOut() {
    return instance.delete<BaseResponseType>('auth/login');
  },
  me() {
    return instance.get<BaseResponseType<{ id: number, email: string, login: string }>>('auth/me');
  }
};

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
