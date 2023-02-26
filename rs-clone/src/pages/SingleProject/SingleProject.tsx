import React, { useEffect, useState, useCallback } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { Button, EmptyData, Overlay, Preloader } from '../../components';
import { AsideBar } from './components';
import { useProjects, useBoard } from '../../contexts';
import ProjectType from '../../types/project/projectType';
import { useUser } from '../../contexts';

import './SingleProject.scss';

function SingleProject() {
  const { id } = useParams();
  const { setProjectDataBack, setTasksDataBack, setUsersDataBack } = useBoard();
  const { isProjectExist, getProjects } = useProjects();
  const [projectExistence, setProjectExistence] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [customMessage, setCustomMessage] = useState('Project is not exist');
  const { currentUser, visitProject } = useUser();

  useEffect(() => {
    if (currentUser) {
      (async (_id: string) => {
        try {
          await getProjects(_id);
        } catch {
          setCustomMessage('Server error');
        } finally {
          setIsLoading(false);
        }
      })(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    (async () => {
      try {
        if (isProjectExist(id as string)) {
          const data = (await setProjectDataBack(id as string)) as ProjectType;

          await visitProject(data._id);
          console.log('1');
          await setTasksDataBack(data._id);
          await setUsersDataBack([data.author, ...data.team]);

          setProjectExistence(true);
        } else {
          setProjectExistence(false);
        }
      } catch {
        setCustomMessage('Server error');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isProjectExist]);

  const [asideState, setAsideState] = useState(false);

  const onChangeAsideState = useCallback((state: boolean) => {
    setAsideState(state);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="single-project-wrapper">
          <Preloader text={'Loading project data...'} />
        </div>
      ) : (
        <>
          {!projectExistence ? (
            <div className="single-project-wrapper">
              <EmptyData text={customMessage} />

              <Link to="/projects">
                <Button>Go to projects</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="SingleProject">
                <AsideBar onChangeAsideState={onChangeAsideState} />
                <div className={asideState ? 'content aside-hidden' : 'content'}>
                  <Outlet />
                </div>
              </div>
              <Overlay scope={'Board'} />
            </>
          )}
        </>
      )}
    </>
  );
}

export default SingleProject;
