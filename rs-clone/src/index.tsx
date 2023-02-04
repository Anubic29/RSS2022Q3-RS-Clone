import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Dashboard from './components/Dashboard/Dashboard';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Dashboard />} />
        <Route path="projects/:id" element={<h1>Project</h1>} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  </BrowserRouter>
);
