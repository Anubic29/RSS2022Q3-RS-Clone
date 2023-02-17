import { useCallback, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Overlay } from '../../components';
import { AsideBar } from './components';

import './SingleProject.scss';

function SingleProject() {
  const [asideState, setAsideState] = useState(false);

  const onChangeAsideState = useCallback((state: boolean) => {
    setAsideState(state);
  }, []);

  return (
    <>
      <div className="SingleProject">
        <AsideBar onChangeAsideState={onChangeAsideState} />
        <div className={asideState ? 'content aside-hidden' : 'content'}>
          <Outlet />
        </div>
      </div>
      <Overlay scope={'Board'} />
    </>
  );
}

export default SingleProject;
