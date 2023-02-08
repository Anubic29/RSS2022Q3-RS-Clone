import React from 'react';
import BoxWithShadow from '../../../Components/boxWithShadow/BoxWithShadow';
import LoginForm from './Components/LoginForm';
import classes from './LoginPage.module.scss';
import Modal from '../../../Components/Modal/Modal';

const LoginPage = () => {
  return (
    <>
      <Modal translate="half">
        <div className="login-wrap">
          <BoxWithShadow>
            <LoginForm />
          </BoxWithShadow>
          <div className={classes.logo}></div>
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
