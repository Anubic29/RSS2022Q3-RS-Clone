import React, { useState } from 'react';

import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NonAuthRoute from './NonAuthRoute';
import { IsAuthContex } from '../context';

function Routing() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  isAuthenticated;
  const isToken = localStorage.getItem('accessToken');
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
