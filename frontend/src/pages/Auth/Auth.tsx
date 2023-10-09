import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Modal, Loader } from '../../components';
import { SignIn, SignUp } from './components';

import styles from './Auth.module.scss';

interface AuthProps {
  view: 'sign-in' | 'sign-up';
}

function Auth(props: AuthProps) {
  const isLoading = useSelector((state: RootState) => state.signInUpSlice.isLoadingSign);
  const message = useSelector((state: RootState) => state.signInUpSlice.messageSign);

  return (
    <div className={styles['backdrop']}>
      <Modal className={styles['popup']}>
        {isLoading && <Loader className={styles['loader']} />}
        {message.length > 0 && (
          <div className={styles['message-bg']}>
            <p className={styles['message']}>{message}</p>
          </div>
        )}
        <div className={styles['title']}></div>
        <p className={styles['subtitle']}>Login or create user to continue</p>
        {props.view === 'sign-in' && <SignIn />}
        {props.view === 'sign-up' && <SignUp />}
      </Modal>
      <div className={styles['background']}>
        <div className={styles['cover']}></div>
        <div className={styles['image']}></div>
      </div>
    </div>
  );
}

export default Auth;
