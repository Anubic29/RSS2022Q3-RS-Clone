import { AxiosInstance } from 'axios';
import ColumnProjectType from '../types/project/columnProjectType';
import ProjectType from '../types/project/projectType';

export default function (instance: AxiosInstance) {
  return {
    getData(projectId: string) {
      return instance.get<ProjectType>(`api/projects/${projectId}/info`);
    },
    postColumnData(projectId: string, payload: { [key: string]: string }) {
      return instance.post<ColumnProjectType[]>(`api/projects/${projectId}/columns`, payload);
    },
    postTeamData(projectId: string, payload: { userId: string }) {
      return instance.post<string[]>(`api/projects/${projectId}/team`, payload);
    },
    updateData(projectId: string, payload: { [key: string]: string }) {
      return instance.put<ProjectType>(`api/projects/${projectId}/info`, payload);
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
    deleteData(projectId: string) {
      return instance.delete<boolean>(`api/projects/${projectId}/info`);
    },
    deleteColumnData(projectId: string, columnId: string) {
      return instance.delete<boolean>(`api/projects/${projectId}/columns/${columnId}`);
    }
  };
}
