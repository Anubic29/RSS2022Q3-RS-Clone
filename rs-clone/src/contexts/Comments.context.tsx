import React from 'react';
import { useContext, createContext, useState, useMemo, useCallback, useEffect } from 'react';
import api from '../api';

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
type UserInfo = {
  _id: string;
  name: string;
  surname: string;
  email: string;
};

interface TaskContentType {
  getCommentDataBack: (taskId: string) => Promise<boolean>;
  getCommentsList: () => CommentType[];
  addComment: (taskId: string, comment: CommentNoIdType) => void;
  updateComment: (taskId: string, CommentId: string, comment: CommentType) => void;
  deleteComment: (taskId: string, commentId: string) => void;
  getUserData: (userId: string) => Promise<UserInfo> | undefined;
}

export const CommentsContext = createContext<TaskContentType>({
  getCommentDataBack: () => Promise.resolve(false),
  getCommentsList: () => [],
  addComment: () => [],
  updateComment: () => [],
  deleteComment: () => [],
  getUserData: () => undefined
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
    const response = await api.comments.deleteComment(taskId, commentId);
    if (response.status === 200) {
      getCommentDataBack(taskId);
    }
  }, []);

  const getUserData = useCallback(async (userId: string) => {
    const response = await api.comments.getUserData(userId);
    if (response.status === 200) {
      return response.data ? response.data : undefined;
    }
  }, []);

  const values = useMemo(
    () => ({
      getCommentDataBack,
      getCommentsList,
      addComment,
      updateComment,
      deleteComment,
      getUserData
    }),
    [getCommentDataBack, getCommentsList, addComment, updateComment, deleteComment, getUserData]
  );

  return <CommentsContext.Provider value={values}>{props.children}</CommentsContext.Provider>;
};

export const useComments = () => {
  return useContext(CommentsContext);
};
