import { AxiosInstance, AxiosRequestConfig } from 'axios';
import CurrentUserType from '../types/user/currentUserType';
import NotedItemUserType from '../types/user/notedItemUserType';
import UserType from '../types/user/userType';

export default function (instance: AxiosInstance) {
  return {
    getAllData(query: string) {
      return instance.get<UserType[]>(`api/users/${query}`);
    },
    getData(userId: string) {
      return instance.get<UserType>(`api/users/${userId}/info`);
    },
    getCurrentData() {
      return instance.get<CurrentUserType>('api/users/current');
    },
    postData(config: AxiosRequestConfig) {
      return instance.post('api/users', config);
    },
    postNotedData(userId: string, payload: { [key: string]: string }) {
      return instance.post<NotedItemUserType[]>(`api/users/${userId}/noted`, payload);
    },
    updateData(userId: string, config: AxiosRequestConfig) {
      return instance.put(`api/users/${userId}/info`, config);
    },
    deleteData(userId: string) {
      return instance.delete(`api/users/${userId}/info`);
    },
    deleteNotedData(userId: string, noteId: string) {
      return instance.delete<boolean>(`api/users/${userId}/noted/${noteId}`);
    }
  };
}
