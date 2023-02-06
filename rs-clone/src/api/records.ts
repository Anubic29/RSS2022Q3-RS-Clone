import { AxiosInstance, AxiosRequestConfig } from 'axios';

export default function (instance: AxiosInstance) {
  return {
    getData(path: string) {
      return instance.get(`api/${path}`);
    },
    postData(path: string, config: AxiosRequestConfig) {
      return instance.post(`api/${path}`, config);
    },
    updateData(path: string, config: AxiosRequestConfig) {
      return instance.put(`api/${path}`, config);
    },
    deleteData(path: string) {
      return instance.delete(`api/${path}`);
    }
  };
}
