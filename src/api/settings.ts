import axios from 'axios/index';

 const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': 'cea6f080-ff85-4d71-9249-bb41cad72b89'
  }
};
export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
});