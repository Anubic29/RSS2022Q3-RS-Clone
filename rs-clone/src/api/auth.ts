import { AxiosInstance } from 'axios';
import { SignUp } from '../pages';

export default function (instance: AxiosInstance) {
  return {
    signIn(payload: { [key: string]: string }) {
      return instance.post<string>('func/auth', payload);
    },

    signUp(payload: { [key: string]: string }) {
      return instance.post<string>('api/users', payload);
    }
  };
}
