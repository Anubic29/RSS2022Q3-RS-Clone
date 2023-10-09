import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { fetchSignIn, setMessageSign } from '../../../../redux/signInUpSlice';
import { authValidation } from '../../../../data';
import { Button, Input } from '../../../../components';

import styles from './SignIn.module.scss';

type ErrorObjType = {
  email?: string;
  password?: string;
};

const { EMAIL_REGEX, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } = authValidation;

function SignIn() {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorObjType>({});

  const validate = useCallback((data: { [key: string]: string }) => {
    const res: ErrorObjType = {};

    if (!data['email'].match(EMAIL_REGEX)) {
      res.email = 'Email should have correct format';
    }

    if (data['password'].length < PASSWORD_MIN_LENGTH) {
      res.password = 'Password is too short - should be 8 chars minimum.';
    } else if (!data['password'].match(PASSWORD_REGEX)) {
      res.password =
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    setErrors(res);
    return !Object.values(res).some((value) => value && value.length > 0);
  }, []);

  const submitHandler = useCallback(async () => {
    const data = {
      email,
      password
    };
    const areValid = validate(data);

    if (areValid) {
      const answer = await dispatch(fetchSignIn(data));
      if (answer.meta.requestStatus === 'fulfilled') navigate('/');
      setTimeout(() => {
        dispatch(setMessageSign(''));
      }, 1500);
    }
  }, [validate, email, password]);

  return (
    <div className={styles['form']}>
      <Input
        className={styles['input']}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        errorMessage={errors.email}
      />
      <Input
        className={styles['input']}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        errorMessage={errors.password}
      />
      <Button className={styles['btn']} onClick={submitHandler} styleButton="primary">
        Sign in
      </Button>
      <Link className={styles['link']} to="/sign-up">
        Don&apos;t have an account yet? Sign up
      </Link>
    </div>
  );
}

export default SignIn;
