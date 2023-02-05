import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NonAuthRoute from './NonAuthRoute';

function Routing() {
  const isAuthenticated = true;

  return <BrowserRouter>{isAuthenticated ? <AuthRoute /> : <NonAuthRoute />}</BrowserRouter>;
}

export default Routing;
