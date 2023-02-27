import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './LoginForm.module.scss';
import api from '../../../../api';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { changeIsLoading } from '../../Auth';
import { useAuth } from '../../../../contexts';

type ServerError = { errorMessage: string };

const LoginForm = () => {
  const { setTokenData, removeTokenData } = useAuth();
  const [change, changeMessage, setText] = changeIsLoading();

  const passwRegEx = new RegExp('[0-9A-Za-z]{4,}$');
  const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');

  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswInputValue] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [userExist, setUserExist] = useState(true);

  const passwInpRef = useRef<HTMLInputElement>(null);
  const emailInpRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const checkUser = async (email: string, password: string) => {
    change(true);
    const payload = { mail: email, password: password };
    setTimeout(async () => {
      try {
        const response = await api.auth.signIn(payload);
        if (response.status == 200) {
          change(false);
          changeMessage(true);
          setText('Success!');
          setTimeout(() => {
            changeMessage(false);
          }, 1000);
          setUserExist(true);
          setTokenData(response.data);
          navigate('/');
        }
      } catch (error) {
        change(false);
        changeMessage(true);
        setText('Failed!');
        setTimeout(() => {
          changeMessage(false);
        }, 1000);
        removeTokenData();
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<ServerError>;
          if (serverError && serverError.response) {
            if (serverError.response.status === 400) {
              setUserExist(false);
              return;
            }
            return serverError.response.data;
          }
        }
        return { errorMessage: 'Something went wrong...' };
      }
    }, 1500);
  };

  const submitHandler = async (event: React.SyntheticEvent) => {
    setUserExist(true);
    event.preventDefault();
    if (!emailInpRef.current?.value.match(emailRegex)) {
      setEmailIsValid(false);
      setEmailInputValue('');
      return;
    }
    if (passwInpRef.current?.value.match(passwRegEx)) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
      setPasswInputValue('');
      return;
    }

    await checkUser(emailInputValue, passwordInputValue);
  };

  const passwordIndHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.match(passwRegEx)) {
      return;
    }
    if (passwInpRef.current) {
      const value = passwInpRef.current.value;
      setPasswInputValue(value);
    }
  };

  const emailInpHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.match(emailRegex)) {
      return;
    }
    if (emailInpRef.current) {
      const value = emailInpRef.current.value;
      setEmailInputValue(value);
    }
  };

  return (
    <form method="post" className={classes.login_formWrap} onSubmit={submitHandler}>
      <div className={classes.login_logoWrap}></div>
      <p className={classes.login_subTitle}>Login or create user to continue</p>
      <div className={classes.form}>
        <p>
          <input
            ref={emailInpRef}
            onChange={emailInpHandler}
            className={classes.login_input}
            id="email"
            type="email"
            name="email"
            placeholder="E-mail"
            required
          />
        </p>
        {!emailIsValid && <small>Enter valid email</small>}
        <p>
          <input
            onChange={passwordIndHandler}
            ref={passwInpRef}
            className={classes.login_input}
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </p>
        {!passwordIsValid && <small>Password must be atleast 4 characters long</small>}
        {!userExist && <small>Wrong email or password</small>}
        <div className={classes.actions}>
          <button className={classes.login_button} type="submit">
            Login
          </button>
        </div>
        <div className={classes.login_footer}>
          <Link className={classes.login_footerLink} to="/sign-up">
            Create new account
          </Link>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
