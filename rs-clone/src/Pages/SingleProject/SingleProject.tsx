import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AsideBar } from './Components';
import { useBoard } from '../../contexts/Board.context';
import { ProjectId } from '../../Data/FakeProjectPageData';
import './SingleProject.scss';

function SingleProject() {
  const { setProjectDataBack } = useBoard();

  useEffect(() => {
    setProjectDataBack(ProjectId);
  });

  return (
    <div className="SingleProject">
      <AsideBar />
      <Outlet />
    </div>
  );
}

export default SingleProject;
