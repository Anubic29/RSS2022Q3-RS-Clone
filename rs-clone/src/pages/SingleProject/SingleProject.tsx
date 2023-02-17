import { Outlet } from 'react-router-dom';
import { Overlay } from '../../components';
import { AsideBar } from './components';
import './SingleProject.scss';

function SingleProject() {
  return (
    <>
      <div className="SingleProject">
        <AsideBar />
        <Outlet />
      </div>
      <Overlay scope={'Board'} />
    </>
  );
}

export default SingleProject;
