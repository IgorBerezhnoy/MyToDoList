import {instance} from './settings';
import {ResponseType} from './todolists-api';

export const authApi = {
  auth(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId: number }>>('auth/login', data);
  },
  logOut() {
    return instance.delete<ResponseType>('auth/login');
  },
  me() {
    return instance.get<ResponseType<{ id: number, email: string, login: string }>>('auth/me');
  }
};

export type LoginParamsType = {
  email: string
  password: string
  rememberMe: boolean
  captcha?: string
}
