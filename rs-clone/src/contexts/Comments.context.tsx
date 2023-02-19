import { useContext, createContext, useState, useMemo, useCallback, useEffect } from 'react';
import { CurrentUserId } from '../Data/FakeProjectPageData';
import { useBoard } from './Board.context';
import api from '../api';
import { AxiosResponse } from 'axios';

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

interface TaskContentType {
  getCommentDataBack: (taskId: string) => Promise<boolean>;
  getCommentsList: () => CommentType[];
  addComment: (taskId: string, comment: CommentNoIdType) => void;
  updateComment: (taskId: string, CommentId: string, comment: CommentType) => void;
  deleteComment: (taskId: string, commentId: string) => void;
}

export const CommentsContext = createContext<TaskContentType>({
  getCommentDataBack: () => Promise.resolve(false),
  getCommentsList: () => [],
  addComment: () => [],
  updateComment: () => [],
  deleteComment: () => []
});

export const CommentsProvider = (props: { children: React.ReactNode }) => {
  const [commentsList, setCommentsList] = useState<CommentType[]>([]);

  const getCommentDataBack = useCallback(async (taskId: string) => {
    const response = await api.comments.getAllComments(taskId);
    setCommentsList(response.data);
    return true;
  }, []);

  const getCommentsList = useCallback(() => {
    return commentsList;
  }, [commentsList]);

  useEffect(() => {
    console.log('commentsList', commentsList);
  }, [commentsList]);

  const addComment = useCallback(async (taskId: string, addData: CommentNoIdType) => {
    console.log(taskId, addData);
    const payload = {
      text: addData.text,
      author: addData.author,
      date: addData.date,
      dateUpdate: addData.date
    };
    const response = await api.comments.addCommentData(taskId, payload);
    if (response.status === 200) {
      console.log('success');
      const newList = (await response.data) as CommentType;
      setCommentsList((data) => {
        data.length = 0;
        return data.concat(newList);
      });
      return response.data;
    }
  }, []);

  const updateComment = useCallback(
    async (taskId: string, commentId: string, updatedData: CommentType) => {
      const payload = {
        _id: updatedData._id,
        text: updatedData.text,
        author: updatedData.author,
        date: updatedData.date,
        dateUpdate: updatedData.dateUpdate
      };
      const response = await api.comments.updateCommentData(taskId, commentId, payload);
      if (response.status === 200) {
        getCommentDataBack(taskId);
      }
    },
    []
  );

  const deleteComment = useCallback(async (taskId: string, commentId: string) => {
    console.log(getCommentsList());
    const response = await api.comments.deleteComment(taskId, commentId);
    if (response.status === 200) {
      getCommentDataBack(taskId);
    }
  }, []);

  const values = useMemo(
    () => ({
      getCommentDataBack,
      getCommentsList,
      addComment,
      updateComment,
      deleteComment
    }),
    [getCommentDataBack, getCommentsList, addComment, updateComment, deleteComment]
  );

  return <CommentsContext.Provider value={values}>{props.children}</CommentsContext.Provider>;
};

export const useComments = () => {
  return useContext(CommentsContext);
};

// const [userList, setUserList] = useState<UserType[]>([]);
// const [projectInfo, setProjectInfo] = useState<ProjectType | null>(null);
// const [columnList, setColumnList] = useState<ColumnProjectType[]>([]);
// const [taskList, setTaskList] = useState<TaskType[]>([]);
// const [userListFilter, setUserListFilter] = useState<string[]>([]);
// const [searchValue, setSearchValue] = useState<string>('');
// const setProjectDataBack = useCallback(async (ProjectId: string) => {
//   const response = await api.projects.getData(ProjectId);
//   setProjectInfo(response.data);
//   setColumnList(response.data.columnList);
//   return response.data;
// }, []);
// const setTasksDataBack = useCallback(
//   async (ProjectId: string) => {
//     const response = await api.tasks.getAllData(`?project=${ProjectId}`);
//     setTaskList(response.data);
//     return true;
//   },
//   [projectInfo]
// );
