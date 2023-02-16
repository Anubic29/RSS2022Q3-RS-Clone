import { Outlet } from 'react-router-dom';
import { Overlay } from '../../Components';
import { AsideBar } from './Components';
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
