import { Outlet } from 'react-router-dom';
import { AsideBar } from './Components';
import './SingleProject.scss';

function SingleProject() {
  return (
    <div className="SingleProject">
      <AsideBar />
      <Outlet />
    </div>
  );
}

export default SingleProject;
