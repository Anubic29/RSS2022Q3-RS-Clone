import { useCallback, useEffect, useMemo, useState } from 'react';
import { MdSearch, MdStar, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { Link } from 'react-router-dom';
import api from '../../api';
import { Button, EmptyData, Input, Preloader } from '../../components';
import { useProjects, useUser } from '../../contexts';
import ProjectType from '../../types/project/projectType';
import UserType from '../../types/user/userType';
import { ProjectTableRow } from './components';

import styles from './Projects.module.scss';

type ProjectWithAuthorType = {
  proj: ProjectType;
  user: UserType;
};

function Projects() {
  const { projects, getProjects } = useProjects();
  const { currentUser, notedItemList } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [customMessage, setCustomMessage] = useState('There are no projects');
  const [projectList, setProjectList] = useState<ProjectWithAuthorType[]>([]);
  const [serverError, setServerError] = useState(false);
  const [sortField, setSortField] = useState<'title' | 'key' | 'author' | ''>('');
  const [sortOrder, setSortOrder] = useState(false);

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

  useEffect(() => {
    (async () => {
      const result = await projects.map(async (project) => {
        const obj = {
          proj: Object.assign({}, project),
          user: {}
        };
        const response = await api.users.getData(project.author);
        obj.user = response.data;
        obj.proj.author = `${response.data.firstName} ${response.data.lastName}`;
        return obj as ProjectWithAuthorType;
      });
      setProjectList(await Promise.all(result));
    })();
  }, [projects]);

  const projectListDisplay = useMemo(() => {
    let result = projectList;
    if (sortField !== '') {
      if (!sortOrder)
        result = projectList.sort((a, b) => (a.proj[sortField] > b.proj[sortField] ? 1 : -1));
      else result = projectList.sort((a, b) => (b.proj[sortField] > a.proj[sortField] ? 1 : -1));
    }
    return result;
  }, [projectList, sortField, sortOrder]);

  const sortByColumn = useCallback(
    (field: 'title' | 'key' | 'author') => {
      if (sortField === field) {
        setSortOrder((prev) => !prev);
      } else {
        setSortOrder(false);
      }
      setSortField(field);
    },
    [sortField]
  );

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
        <div className={styles.empty}>
          <Preloader text={'Loading projects...'} />
        </div>
      ) : projects.length && !serverError ? (
        <table className={styles['project-list']}>
          <thead className={styles['project-list__header']}>
            <tr className={styles['project-list__header-row']}>
              <th className={styles['project__star']}>
                <MdStar />
              </th>
              <th
                className={`${styles['project__title']} ${styles['sortable-cell']}`}
                onClick={() => sortByColumn('title')}>
                <span className={styles['content']}>
                  Title
                  {sortField === 'title' && (
                    <span className={styles['icon']}>
                      {!sortOrder ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                    </span>
                  )}
                </span>
              </th>
              <th
                className={`${styles['project__key']} ${styles['sortable-cell']}`}
                onClick={() => sortByColumn('key')}>
                <span className={styles['content']}>
                  Key
                  {sortField === 'key' && (
                    <span className={styles['icon']}>
                      {!sortOrder ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                    </span>
                  )}
                </span>
              </th>
              <th className={styles['project__description']}>Description</th>
              <th
                className={`${styles['project__author']} ${styles['sortable-cell']}`}
                onClick={() => sortByColumn('author')}>
                <span className={styles['content']}>
                  Author
                  {sortField === 'author' && (
                    <span className={styles['icon']}>
                      {!sortOrder ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
                    </span>
                  )}
                </span>
              </th>
              <th className={styles['project__menu']}></th>
            </tr>
          </thead>
          <tbody className={styles['project-list__body']}>
            {projectListDisplay.map((project) => {
              return (
                <ProjectTableRow
                  _id={project.proj._id}
                  key={project.proj._id}
                  title={project.proj.title}
                  projPathImage={project.proj.pathImage}
                  projColor={project.proj.color}
                  myKey={project.proj.key}
                  description={project.proj.description}
                  author={project.user}
                  noted={notedItemList.some((data) => data.id === project.proj._id)}
                  setMainLoading={(state: boolean) => setIsLoading(state)}
                  setMainCustomMessage={(text: string) => setCustomMessage(text)}
                  setServerError={(state: boolean) => setServerError(state)}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className={styles.empty}>
          <EmptyData text={customMessage} />
        </div>
      )}
    </div>
  );
}

export default Projects;
