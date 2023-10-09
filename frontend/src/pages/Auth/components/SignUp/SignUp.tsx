import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { fetchSignUp, setMessageSign } from '../../../../redux/signInUpSlice';
import { authValidation } from '../../../../data';
import { Button, Input } from '../../../../components';

import styles from './SignUp.module.scss';

type ErrorObjType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const { NAME_REGEX, EMAIL_REGEX, PASSWORD_MIN_LENGTH, PASSWORD_REGEX } = authValidation;

function SignUp() {
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ErrorObjType>({});

  const validate = useCallback((data: { [key: string]: string }) => {
    const res: ErrorObjType = {};

    if (data['firstName'].trim().length === 0) {
      res.firstName = 'First name can`t be empty';
    } else if (!data['firstName'].match(NAME_REGEX)) {
      res.firstName = 'First name must be 1 word and contain only letters';
    }

    if (data['lastName'].trim().length === 0) {
      res.lastName = 'Last name can`t be empty';
    } else if (!data['lastName'].match(NAME_REGEX)) {
      res.lastName = 'Last name must be 1 word and contain only letters';
    }

    if (!data['email'].match(EMAIL_REGEX)) {
      res.email = 'Email should have correct format';
    }

    if (data['password'].length < PASSWORD_MIN_LENGTH) {
      res.password = 'Password is too short - should be 8 chars minimum.';
    } else if (!data['password'].match(PASSWORD_REGEX)) {
      res.password =
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }

    if (data['confirmPassword'] !== data['password']) {
      res.confirmPassword = 'Confirm password must be equal password';
    }

    setErrors(res);
    return !Object.values(res).some((value) => value && value.length > 0);
  }, []);

  const submitHandler = useCallback(async () => {
    const data = {
      firstName,
      lastName,
      email,
      password
    };
    const areValid = validate({ ...data, confirmPassword });

    if (areValid) {
      const answer = await dispatch(fetchSignUp(data));
      if (answer.meta.requestStatus === 'fulfilled') navigate('/sign-in');
      setTimeout(() => {
        dispatch(setMessageSign(''));
      }, 1500);
    }
  }, [firstName, lastName, email, password, confirmPassword, validate]);

  return (
    <div className={styles['form']}>
      <Input
        className={styles['input']}
        placeholder="First Name"
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        required
        errorMessage={errors.firstName}
      />
      <Input
        className={styles['input']}
        placeholder="Last Name"
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        required
        errorMessage={errors.lastName}
      />
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
      <Input
        className={styles['input']}
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        required
        errorMessage={errors.confirmPassword}
      />
      <Button className={styles['btn']} onClick={submitHandler} styleButton="primary">
        Sign up
      </Button>
      <Link className={styles['link']} to="/sign-in">
        Already have an account? Sign in!
      </Link>
    </div>
  );
}

export default SignUp;
