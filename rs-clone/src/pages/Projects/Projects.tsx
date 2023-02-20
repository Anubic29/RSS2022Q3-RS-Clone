import { useEffect, useState } from 'react';
import { MdSearch, MdStar } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Button, EmptyData, Input, Preloader } from '../../components';
import { useProjects, useUser } from '../../contexts';
import ProjectType from '../../types/project/projectType';
import { ProjectTableRow } from './components';

import styles from './Projects.module.scss';

function Projects() {
  const { projects, getProjects } = useProjects();
  const { currentUser, notedItemList } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [customMessage, setCustomMessage] = useState('There are no projects');
  const [projectList, setProjectList] = useState<ProjectType[]>([]);

  useEffect(() => {
    if (currentUser) {
      (async (_id: string) => {
        try {
          await getProjects(_id);
        } catch {
          setCustomMessage(`Server error`);
        } finally {
          setIsLoading(false);
        }
      })(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => setProjectList(projects), [projects]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles['title-row']}>
          <h1 className={styles.title}>Projects</h1>
          <Link to="/create-project">
            <Button>Create Project</Button>
          </Link>
        </div>
        <div className={styles['search-block']}>
          <Input id="search-projects" type="text" className={styles['search-bar']} />
          <div className={styles.icon}>
            <MdSearch />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.Empty}>
          <Preloader text={'Loading projects...'} />
        </div>
      ) : projects.length ? (
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
                  _id={project._id}
                  key={project._id}
                  title={project.title}
                  projPathImage={project.pathImage}
                  projColor={project.color}
                  myKey={project.key}
                  description={project.description}
                  author={project.author}
                  noted={notedItemList.some((data) => data.id === project._id)}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={styles.Empty}>
          <EmptyData text={customMessage} />
        </div>
      )}
    </div>
  );
}

export default Projects;
