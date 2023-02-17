import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { Project } from '../api/allProjects';

export interface ProjectsContextValue {
  projects: Project[] | [];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

function ProjectsProvider({ children }: PropsWithChildren) {
  const [projects, setProjects] = useState<Project[]>([]);
  const contextValue: ProjectsContextValue = {
    projects,
    setProjects
  };

  return <ProjectsContext.Provider value={contextValue}>{children}</ProjectsContext.Provider>;
}

const useProjects = () => useContext(ProjectsContext);

export { ProjectsProvider, useProjects };
