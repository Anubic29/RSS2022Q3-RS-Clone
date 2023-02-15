import { AxiosInstance } from 'axios';
import ColumnProjectType from '../Types/Project/ColumnProjectType';
import ProjectType from '../Types/Project/ProjectType';

export default function (instance: AxiosInstance) {
  return {
    getData(projectId: string) {
      return instance.get<ProjectType>(`api/projects/${projectId}/info`);
    },
    postColumnData(projectId: string, payload: { [key: string]: string }) {
      return instance.post<ColumnProjectType[]>(`api/projects/${projectId}/columns`, payload);
    },
    updateAllColumnData(projectId: string, payload: { columnList: ColumnProjectType[] }) {
      return instance.put<ColumnProjectType[]>(`api/projects/${projectId}/columns`, payload);
    },
    updateColumnData(projectId: string, columnId: string, payload: { [key: string]: string }) {
      return instance.put<ColumnProjectType>(
        `api/projects/${projectId}/columns/${columnId}`,
        payload
      );
    },
    deleteColumnData(projectId: string, columnId: string) {
      return instance.delete<boolean>(`api/projects/${projectId}/columns/${columnId}`);
    }
  };
}
