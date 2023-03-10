import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import ProjectType from '../types/project/projectType';
import {
  createProjectRequest,
  deleteProjectRequest,
  getProjectRequest,
  getProjectsRequest
} from '../api/allProjects';
import { ProjectCreateBody } from '../types/project/projectCreateBody';
import { ACCESS_TOKEN, BASE_URL } from '../api/config';
import ColumnProjectType from '../types/project/columnProjectType';
import UserType from '../types/user/userType';
import { useUser } from './User.context';

export interface ProjectsContextValue {
  projects: ProjectType[];
  getProjects: (_id: string) => Promise<ProjectType[]>;
  deleteProject: (id: string) => void;
  createProject: (body: ProjectCreateBody) => void;
  isProjectExist: (id: string) => boolean;
  getProject: (id: string) => Promise<ProjectType>;
  getColumnById: (id: string) => ColumnProjectType | undefined;
  changeProjectAuthor: (projectId: string, userId: string) => void;
  getUsers: () => Promise<UserType[]>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function ProjectsProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [columnList, setColumnList] = useState<ColumnProjectType[]>([]);
  const { ...uData } = useUser();

  const getProjects = useCallback(
    async (_id: string) => {
      const fetchedProjects = await getProjectsRequest(_id);
      setProjects(fetchedProjects);
      return fetchedProjects;
    },
    [uData.currentUser, projects]
  );

  useEffect(() => {
    setColumnList(
      projects.reduce((acc: ColumnProjectType[], data) => acc.concat(data.columnList), [])
    );
  }, [projects]);

  const getColumnById = useCallback(
    (id: string) => {
      return columnList.find((column) => column._id === id);
    },
    [columnList]
  );

  const deleteProject = async (id: string) => {
    await removeProjectTasks(id);
    await deleteProjectRequest(id);
    setProjects(projects.filter((project) => project._id !== id));
  };

  const createProject = async (body: ProjectCreateBody) => {
    await createProjectRequest(body);
    setProjects([...projects, body as ProjectType]);
  };

  const getProject = async (id: string) => {
    return await getProjectRequest(id);
  };

  const removeProjectTasks = async (id: string) => {
    await fetch(`${BASE_URL}/tasks/by-project/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });
  };

  const changeProjectAuthor = async (projectId: string, userId: string) => {
    await fetch(`${BASE_URL}/projects/${projectId}/change-admin`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });
  };

  const isProjectExist = useCallback(
    (id: string) => {
      return projects.some((project) => project._id === id);
    },
    [projects]
  );

  const getUsers = async () => {
    const fetchedUsers = await fetch(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`
      }
    });

    return await fetchedUsers.json();
  };

  const contextValue: ProjectsContextValue = {
    projects,
    getProjects,
    deleteProject,
    createProject,
    isProjectExist,
    getProject,
    getColumnById,
    changeProjectAuthor,
    getUsers
  };

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
}

const useProjects = () => useContext(ProjectsContext) as ProjectsContextValue;

export { ProjectsProvider, useProjects };
