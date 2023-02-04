import React from 'react';
import BoxWithShadow from '../components/boxWithShadow/BoxWithShadow';
import LoginForm from '../components/LoginForm/LoginForm';
import classes from './LoginPage.module.scss';
import Modal from '../components/Modal/Modal';

const LoginPage = () => {
  return (
    <>
      <Modal>
        <div className="login-wrap">
          <BoxWithShadow>
            <LoginForm />
          </BoxWithShadow>
          <div className={classes.img}></div>
        </div>
      </Modal>
      <div>
        <img
          className={classes.login_bgimg__left}
          src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.414/static/media/default_left.e74de3ec.svg"></img>
      </div>
      <div>
        <img
          className={classes.login_bgimg__right}
          src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.414/static/media/default_right.6ece9751.svg"></img>
      </div>
    </>
  );
};

export default LoginPage;
