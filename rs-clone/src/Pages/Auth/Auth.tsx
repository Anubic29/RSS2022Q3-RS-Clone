import { useState, Dispatch } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import classes from './Auth.module.scss';
import Modal from '../../Components/Modal/Modal';
import BoxWithShadow from '../../Components/boxWithShadow/BoxWithShadow';
import LoaderImg from '../../Components/Loader/Loader';
import Message from '../../Components/LoaderMessage/Message';

function Auth() {
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [showResult, setShowResult] = useState(false);
  const [text, setText] = useState('');
  const change = (val: boolean) => {
    setIsLoadingData(val);
  };
  const changeMessage = (val: boolean) => {
    setShowResult(val);
  };
  const setMessageText = (val: string) => {
    setText(val);
  };

  return (
    <div className="Auth">
      <div className={classes.modal_wrap}>
        <Modal translate={'twenty'}>
          <div className={classes['login-wrap']}>
            <BoxWithShadow>
              {isLoadingData && <LoaderImg />}
              {showResult && <Message text={text} />}
              <Outlet context={[change, changeMessage, setMessageText]} />
            </BoxWithShadow>
            <div className={classes.logo}></div>
          </div>
        </Modal>
      </div>
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
    </div>
  );
}

export function changeIsLoading() {
  return useOutletContext<
    [
      Dispatch<React.SetStateAction<boolean>>,
      Dispatch<React.SetStateAction<boolean>>,
      Dispatch<React.SetStateAction<string>>
    ]
  >();
}

export default Auth;
