import React, { useEffect, useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NonAuthRoute from './NonAuthRoute';
import { IsAuthContex } from '../context';

function Routing() {
  const isToken = localStorage.getItem('accessToken');
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(isToken));
  useEffect(() => {
    setIsAuthenticated(Boolean(isToken));
  }, [isAuthenticated]);
  return (
    <>
      <BrowserRouter>
        <IsAuthContex.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          {isAuthenticated || isToken ? <AuthRoute /> : <NonAuthRoute />}
        </IsAuthContex.Provider>
      </BrowserRouter>
    </>
  );
}

export default Routing;
