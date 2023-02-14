import { AxiosInstance } from 'axios';
import ProjectType from '../Types/Project/ProjectType';

export default function (instance: AxiosInstance) {
  return {
    getData(projectId: string) {
      return instance.get<ProjectType>(`api/projects/${projectId}/info`);
    }
  };
}
