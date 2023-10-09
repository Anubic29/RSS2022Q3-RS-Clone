import { AxiosInstance } from 'axios';
import UserType from '../types/user/userType';

export default function (instance: AxiosInstance) {
  return {
    getAllData(query?: string) {
      return instance.get<UserType[]>(`api/users/${query ?? ''}`);
    },

    getDetails(payload: { list: string[] }) {
      return instance.post<UserType[]>('api/users/details', payload);
    }
  };
}
