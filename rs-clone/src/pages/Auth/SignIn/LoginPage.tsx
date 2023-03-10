import React from 'react';
import LoginForm from './components/LoginForm';
import classes from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={classes.login_outerWrap}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
