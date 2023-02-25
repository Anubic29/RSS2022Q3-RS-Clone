import { Route, Routes, Navigate } from 'react-router-dom';
import { App } from '../components';
import { BoardProvider } from '../contexts/Board.context';
import {
  Dashboard,
  NotFound,
  ProjectCreate,
  Projects,
  Board,
  Settings,
  SingleProject,
  Team
} from '../pages';
import { ProjectsProvider } from '../contexts';
import { UserProvider } from '../contexts/User.context';
import { AlertsProvider } from '../contexts/AlertsContext';
import { TasksProvider } from '../contexts/TasksContext';
import { CommentsProvider } from '../contexts/Comments.context';

function AuthRoute() {
  return (
    <UserProvider>
      <ProjectsProvider>
        <TasksProvider>
          <AlertsProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="sign-in" element={<Navigate to={'/'} />} />
                <Route path="sign-up" element={<Navigate to={'/'} />} />
                <Route path="projects" element={<Projects />} />
                <Route
                  path="projects/:id"
                  element={
                    <BoardProvider>
                      <CommentsProvider>
                        <SingleProject />
                      </CommentsProvider>
                    </BoardProvider>
                  }>
                  <Route index element={<Navigate to="board" />} />
                  <Route path="board" element={<Board />} />
                  <Route path="board/selected-task/:taskId" element={<Board />} />
                  <Route path="selected-task/:taskId" element={<Board />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="team" element={<Team />} />
                </Route>
              </Route>
              <Route path="create-project" element={<ProjectCreate />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AlertsProvider>
        </TasksProvider>
      </ProjectsProvider>
    </UserProvider>
  );
}

export default AuthRoute;
