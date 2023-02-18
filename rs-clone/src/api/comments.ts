import { AxiosInstance } from 'axios';

type CommentType = {
  text: string;
  author: string;
  date: Date;
  dateUpdate: Date;
};

export default function (instance: AxiosInstance) {
  return {
    getAllComments(taskId: string) {
      return instance.get<CommentType[]>(`/${taskId}/comments`);
    }
  };
}
