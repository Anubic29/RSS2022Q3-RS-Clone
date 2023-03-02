import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import NonAuthRoute from './NonAuthRoute';
import { useAuth } from '../contexts';

function Routing() {
  const { token, setTokenData } = useAuth();

  useEffect(() => {
    const newToken = localStorage.getItem('accessToken');
    setTokenData(newToken ?? '');
  }, []);

  return (
    <>
      <BrowserRouter>{token ? <AuthRoute /> : <NonAuthRoute />}</BrowserRouter>
    </>
  );
}

export default Routing;
