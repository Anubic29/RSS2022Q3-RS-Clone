import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard/Dashboard';
import ProjectPage from './pages/ProjectPage/ProjectPage';

import './index.scss';
import { BoardProvider } from './Context/Board.context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route
          path="projects/:id"
          element={
            <BoardProvider>
              <ProjectPage />
            </BoardProvider>
          }
        />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  </BrowserRouter>
);
