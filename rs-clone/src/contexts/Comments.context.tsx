import { useContext, createContext, useState, useMemo, useCallback } from 'react';
import { CurrentUserId } from '../Data/FakeProjectPageData';
import api from '../api';

type CommentType = {
  text: string;
  author: string;
  date: Date;
  dateUpdate: Date;
};

// interface TaskContentType {
//   setCommentDataBack: (taskId: string) => Promise<boolean>;
//   getCommentsList: () => CommentType[] | null;
//   createComment?: (comment: CommentType) => void;
//   editComent?: (id: string) => void;
//   deleteComent?: (id: string) => void;
// }

// export const CommentsContext = createContext<TaskContentType>({
//   setCommentDataBack: () => Promise.resolve(false),
//   getCommentsList: () => []
//   // createComment: () => {},
//   // editComent: () => {},
//   // deleteComent: () => {}
// });

// export const CommentsProvider = (props: { children: React.ReactNode }) => {
//   const [commentsList, setCommentsList] = useState<CommentType[] | null>(null);

//   const setCommentDataBack = useCallback(async (taskId: string) => {
//     const response = await api.comments.getAllComments(taskId);
//     setCommentsList(response.data);
//     return true;
//   }, []);

//   const getCommentsList = useCallback(() => {
//     return commentsList;
//   }, [commentsList]);

//   const values = useMemo(
//     () => ({
//       setCommentDataBack,
//       getCommentsList
//     }),
//     [setCommentDataBack, getCommentsList]
//   );

//   return <CommentsContext.Provider value={values}>{props.children}</CommentsContext.Provider>;
// };

// export const useComments = () => {
//   return useContext(CommentsContext);
// };

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
