import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default function (instance: AxiosInstance) {
  return {
    getAllData() {
      return instance.get('api/users');
    },
    getData(userId: string) {
      return instance.get(`api/users/${userId}/info`);
    },
    postData(config: AxiosRequestConfig) {
      return instance.post('api/users', config);
    },
    postNotedData(userId: string, config: AxiosRequestConfig) {
      return instance.post(`api/users/${userId}/noted`, config);
    },
    updateData(userId: string, config: AxiosRequestConfig) {
      return instance.put(`api/users/${userId}/info`, config);
    },
    deleteData(userId: string) {
      return instance.delete(`api/users/${userId}/info`);
    },
    deleteNotedData(userId: string, noteId: string) {
      return instance.delete(`api/users/${userId}/noted/${noteId}`);
    }
  };
}
