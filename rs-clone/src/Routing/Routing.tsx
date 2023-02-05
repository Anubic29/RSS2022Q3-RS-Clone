import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from '../Components';
import { Dashboard, NotFound } from '../Pages';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
