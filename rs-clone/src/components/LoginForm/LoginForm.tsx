import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginForm.module.scss';

const LoginForm = () => {
  if (localStorage.getItem('hasUser') === null) {
    localStorage.setItem('hasUser', 'false');
  }
  const hasUser = JSON.parse(localStorage.getItem('hasUser') as string);

  const [isLogin, setIsLogin] = useState(hasUser);
  function switchAuthHandler() {
    setIsLogin(() => true);
    localStorage.setItem('hasUser', 'true');
  }
  return (
    <form method="post" className={classes.login_formWrap}>
      <div className={classes.login_logoWrap}></div>
      <p className={classes.login_subTitle}>Login or create user to continue</p>
      <div className={classes.form}>
        <p>
          <input
            className={classes.login_input}
            id="email"
            type="email"
            name="email"
            placeholder="E-mail"
            required
          />
        </p>
        <p>
          <input
            className={classes.login_input}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </p>
        <div className={classes.actions}>
          <button className={classes.login_button} onClick={switchAuthHandler} type="button">
            {isLogin ? 'Login' : 'Create new user'}
          </button>
        </div>
        <div className={classes.login_footer}>
          <Link className={classes.login_footerLink} to="/">
            Have user? Login
          </Link>
          <Link className={classes.login_footerLink} to="/">
            Create new account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
