import SignUpForm from './Components/SignUpForm';
import Modal from '../../../Components/Modal/Modal';
import BoxWithShadow from '../../../Components/boxWithShadow/BoxWithShadow';
import classes from './SignUp.module.scss';

function SignUp() {
  return (
    <>
      <Modal translate={'twenty'}>
        <div className="login-wrap">
          <BoxWithShadow>
            <SignUpForm />
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
}

export default SignUp;
