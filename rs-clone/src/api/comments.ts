import { AxiosInstance } from 'axios';

type CommentType = {
  _id: string;
  text: string;
  author: string;
  date: string;
  dateUpdate: string;
};
type CommentNoIdType = {
  text: string;
  author: string;
  date: string;
  dateUpdate: string;
};

export default function (instance: AxiosInstance) {
  return {
    getAllComments(taskId: string) {
      return instance.get<CommentType[]>(`/api/tasks/${taskId}/comments`);
    },

    addCommentData(taskId: string, payload: CommentNoIdType) {
      return instance.post<CommentNoIdType>(`/api/tasks/${taskId}/comments`, payload);
    },

    updateCommentData(taskId: string, commentId: string, payload: CommentType) {
      return instance.put<CommentType>(`/api/tasks/${taskId}/comments/${commentId}`, payload);
    },

    deleteComment(taskId: string, commentId: string) {
      return instance.delete(`/api/tasks/${taskId}/comments/${commentId}`);
    }
  };
}
