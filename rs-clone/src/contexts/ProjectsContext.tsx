import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import ProjectType from '../types/project/projectType';
import { createProjectRequest, deleteProjectRequest, getProjectsRequest } from '../api/allProjects';
import { ProjectCreateBody } from '../types/project/projectCreateBody';

export interface ProjectsContextValue {
  projects: ProjectType[];
  getProjects: (_id: string) => void;
  deleteProject: (id: string) => void;
  createProject: (body: ProjectCreateBody) => void;
  isProjectExist: (id: string) => boolean;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function ProjectsProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const getProjects = useCallback(async (_id: string) => {
    const fetchedProjects = await getProjectsRequest(_id);
    setProjects(fetchedProjects);
  }, []);

  const deleteProject = async (id: string) => {
    await deleteProjectRequest(id);
    setProjects(projects.filter((project) => project._id !== id));
  };

  const createProject = async (body: ProjectCreateBody) => {
    await createProjectRequest(body);
    setProjects([...projects, body as ProjectType]);
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
    isProjectExist
  };

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
}

const useProjects = () => useContext(ProjectsContext);

export { ProjectsProvider, useProjects };
