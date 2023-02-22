import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import ProjectType from '../types/project/projectType';
import {
  createProjectRequest,
  deleteProjectRequest,
  getProjectRequest,
  getProjectsRequest
} from '../api/allProjects';
import { ProjectCreateBody } from '../types/project/projectCreateBody';
import { ACCESS_TOKEN, BASE_URL, getCurrentUserId } from '../api/config';
import TaskType from '../types/task/taskType';

export interface ProjectsContextValue {
  projects: ProjectType[];
  getProjects: (_id: string) => void;
  deleteProject: (id: string) => void;
  createProject: (body: ProjectCreateBody) => void;
  isProjectExist: (id: string) => boolean;
  getProject: (id: string) => Promise<ProjectType>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function ProjectsProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const getProjects = useCallback(async (_id: string) => {
    const fetchedProjects = await getProjectsRequest(_id);
    setProjects(fetchedProjects);
  }, []);

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

  const isProjectExist = useCallback(
    (id: string) => {
      return projects.some((project) => project._id === id);
    },
    [projects]
  );

  const contextValue: ProjectsContextValue = {
    projects,
    getProjects,
    deleteProject,
    createProject,
    isProjectExist,
    getProject
  };

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
}

const useProjects = () => useContext(ProjectsContext) as ProjectsContextValue;

export { ProjectsProvider, useProjects };
