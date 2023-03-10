import { Route, Routes, Navigate } from 'react-router-dom';
import { App } from '../components';
import {
  Dashboard,
  NotFound,
  ProjectCreate,
  Projects,
  Board,
  Settings,
  SingleProject,
  Team,
  Profile
} from '../pages';
import {
  ProjectsProvider,
  BoardProvider,
  UserProvider,
  AlertsProvider,
  TasksProvider,
  CommentsProvider
} from '../contexts';

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
                <Route path="profile" element={<Profile />} />
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
