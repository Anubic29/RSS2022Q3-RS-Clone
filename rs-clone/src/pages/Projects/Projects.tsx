import { useEffect, useState } from 'react';
import { MdSearch, MdStar } from 'react-icons/md';
import { Button, Input } from '../../components';
import { useProjects } from '../../contexts';
import ProjectType from '../../types/project/projectType';
import { ProjectTableRow } from './components';

import styles from './Projects.module.scss';

function Projects() {
  const { projects } = useProjects();
  const [projectList, setProjectList] = useState<ProjectType[]>([]);

  useEffect(() => setProjectList(projects), [projects]);

  useEffect(() => console.log(projects), [projects]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles['title-row']}>
          <h1 className={styles.title}>Projects</h1>
          <Button>Create Project</Button>
        </div>
        <div className={styles['search-block']}>
          <Input id="search-projects" type="text" className={styles['search-bar']} />
          <div className={styles.icon}>
            <MdSearch />
          </div>
        </div>
      </div>
      <table className={styles['project-list']}>
        <thead className={styles['project-list__header']}>
          <tr className={styles['project-list__header-row']}>
            <th className={styles['project__star']}>
              <MdStar />
            </th>
            <th className={styles['project__title']}>Title</th>
            <th className={styles['project__key']}>Key</th>
            <th className={styles['project__description']}>Description</th>
            <th className={styles['project__author']}>Author</th>
            <th className={styles['project__menu']}></th>
          </tr>
        </thead>
        <tbody className={styles['project-list__body']}>
          {projectList.map((project) => {
            return (
              <ProjectTableRow
                key={project._id}
                title={project.title}
                myKey={project.key}
                description={project.description}
                author={project.author}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Projects;
