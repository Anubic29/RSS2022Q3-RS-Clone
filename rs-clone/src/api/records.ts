import { AxiosInstance } from 'axios';

export default function (instance: AxiosInstance) {
  return {
    getData(path: string) {
      return instance.get(`api/${path}`);
    },
    postData(path: string, payload: { [key: string]: string }) {
      return instance.post(`api/${path}`, payload);
    },
    updateData(path: string, payload: { [key: string]: string }) {
      return instance.put(`api/${path}`, payload);
    },
    deleteData(path: string) {
      return instance.delete(`api/${path}`);
    },
    signIn(payload: { [key: string]: string }) {
      return instance.post<string>('func/auth', payload);
    }
  };
}
