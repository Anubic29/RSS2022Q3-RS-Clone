import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './SignUpForm.module.scss';
import api from '../../../../api';
import axios, { AxiosError } from 'axios';
import { IsAuthContex } from '../../../../context';
import { changeIsLoading } from '../../Auth';

type ServerError = { errorMessage: string };

const LoginForm = () => {
  const contextValue = useContext(IsAuthContex);
  const [change, changeMessage, setText] = changeIsLoading();

  const passwRegEx = new RegExp('[0-9A-Za-z]{4,}$');
  const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
  const navigate = useNavigate();

  const [, setEmailInputValue] = useState('');
  const [, setPasswInputValue] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const [loginIsAvailable, setloginIsAvailable] = useState(true);
  const [isNoEmtyFiels, setIsNoEmptyFields] = useState(true);
  const [passwIsMatch, setPasswIsMatch] = useState(true);

  const [, setIsCreatedUser] = useState(false);

  const confirmPassRef = useRef<HTMLInputElement>(null);
  const passwInpRef = useRef<HTMLInputElement>(null);
  const emailInpRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const setUser = async (firstName: string, lastName: string, email: string, password: string) => {
    change(true);
    const payload = { firstName: firstName, lastName: lastName, mail: email, password: password };
    const payloadLogIn = { mail: email, password: password };
    setTimeout(async () => {
      try {
        const response = await api.auth.signUp(payload);
        if (response.status === 200) {
          const responseSignIn = await api.auth.signIn(payloadLogIn);
          console.log(await responseSignIn.data);
          localStorage.setItem('accessToken', JSON.stringify(responseSignIn.data));
          setIsCreatedUser(true);
          contextValue.setIsAuthenticated(true);
          navigate('/');
        }
      } catch (error) {
        change(false);
        changeMessage(true);
        setText('Failed');
        setTimeout(() => {
          changeMessage(false);
        }, 1000);
        contextValue.setIsAuthenticated(false);
        changeMessage(true);
        setTimeout(() => {
          changeMessage(false);
        }, 1000);
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<ServerError>;
          if (serverError && serverError.response) {
            if (serverError.response.status === 412) {
              setloginIsAvailable(false);
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
    event.preventDefault();
    const firstName = firstNameRef.current ? firstNameRef.current.value.trim() : '';
    const lastName = lastNameRef.current ? lastNameRef.current.value.trim() : '';
    const email = emailInpRef.current ? emailInpRef.current.value.trim() : '';
    const password = passwInpRef.current ? passwInpRef.current.value : '';
    const confirm = confirmPassRef.current ? confirmPassRef.current.value : '';

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      email.length === 0 ||
      password.length === 0
    ) {
      setIsNoEmptyFields(false);
    }

    if (!email.match(emailRegex)) {
      setEmailIsValid(false);
      setEmailInputValue('');
      return;
    } else {
      setEmailIsValid(true);
    }

    if (!password.match(passwRegEx)) {
      setPasswordIsValid(false);
      setPasswInputValue('');
      return;
    } else {
      setPasswordIsValid(true);
    }
    const passwIsMatched = password === confirm;
    if (!passwIsMatched) {
      setPasswIsMatch(false);
    }
    if (isNoEmtyFiels && passwIsMatched) {
      await setUser(firstName, lastName, email, password);
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
    <>
      <form method="post" className={classes.login_formWrap} onSubmit={submitHandler}>
        <div className={classes.login_logoWrap}></div>
        <p className={classes.login_subTitle}>Login or create user to continue</p>
        <div className={classes.form}>
          <div>
            <p>
              <input
                ref={firstNameRef}
                onChange={emailInpHandler}
                className={classes.login_input}
                id="first-name"
                type="text"
                name="first-name"
                placeholder="First Name"
                required
              />
            </p>
            <p>
              <input
                ref={lastNameRef}
                onChange={emailInpHandler}
                className={classes.login_input}
                id="last-name"
                type="text"
                name="last-name"
                placeholder="Last Name"
                required
              />
            </p>
          </div>
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
          <p>
            <input
              ref={confirmPassRef}
              className={classes.login_input}
              id="password"
              type="password"
              name="password"
              placeholder="Confirm password"
              required
            />
          </p>
          {!isNoEmtyFiels && <small>All fieldrs are mandory!</small>}
          {!loginIsAvailable && <small>User already exist, please login</small>}
          {!passwIsMatch && <small>Passwords didn`t match</small>}
          <div className={classes.actions}>
            <button className={classes.login_button} type="submit">
              Create account
            </button>
          </div>
          <div className={classes.login_footer}>
            <Link className={classes.login_footerLink} to="/sign-in">
              Have an account? Log in!
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
