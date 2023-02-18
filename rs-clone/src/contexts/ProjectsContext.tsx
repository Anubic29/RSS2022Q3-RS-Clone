import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import ProjectType from '../types/project/projectType';
import { createProjectRequest, deleteProjectRequest, getProjectsRequest } from '../api/allProjects';
import { ProjectCreateBody } from '../types/project/projectCreateBody';

export interface ProjectsContextValue {
  projects: ProjectType[] | [];
  getProjects: () => void;
  deleteProject: (id: string) => void;
  createProject: (body: ProjectCreateBody) => void;
  isProjectExist: (id: string) => Promise<boolean>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function ProjectsProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  const getProjects = async () => {
    const fetchedProjects = await getProjectsRequest();

    setProjects(fetchedProjects);
  };

  const deleteProject = async (id: string) => {
    await deleteProjectRequest(id);
    setProjects(projects.filter((project) => project._id !== id));
  };

  const createProject = async (body: ProjectCreateBody) => {
    await createProjectRequest(body);
    setProjects([...projects, body as ProjectType]);
  };

  const isProjectExist = async (id: string) => {
    const fetchedProjects = await getProjectsRequest();

    return fetchedProjects.some((project) => project._id === id);
  };

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
