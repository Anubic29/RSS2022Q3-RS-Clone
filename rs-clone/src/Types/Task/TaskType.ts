import CommentTaskType from './commentTaskType';

type TaskType = {
  _id: string;
  id: number;
  title: string;
  description: string;
  author: string;
  executor: string;
  projectId: string;
  columnId: string;
  commentList: CommentTaskType[];
  __v: number;
};

export default TaskType;
