import { AxiosInstance } from 'axios';
import TaskType from '../types/task/taskType';

export default function (instance: AxiosInstance) {
  return {
    getAllData(path: string) {
      return instance.get<TaskType[]>(`api/tasks${path}`);
    },
    postData(payload: { [key: string]: string }) {
      return instance.post<TaskType>('api/tasks', payload);
    },
    updateData(taskId: string, payload: { [key: string]: string }) {
      return instance.put<TaskType>(`api/tasks/${taskId}/info`, payload);
    },
    updateAllDataColumn(payload: { currId: string; newId: string }) {
      return instance.put<boolean>('api/tasks/by-column', payload);
    },
    deleteData(taskId: string) {
      return instance.delete<boolean>(`api/tasks/${taskId}/info`);
    },
    deleteAllDataByColumn(columnId: string) {
      return instance.delete<boolean>(`api/tasks/by-column/${columnId}`);
    },
    deleteAllDataByProject(projectId: string) {
      return instance.delete<boolean>(`api/tasks/by-project/${projectId}`);
    }
  };
}
