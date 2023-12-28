import React, { useRef, useState } from 'react';
import Card from '../../UI/Card/Card';
import FormInput from '../../UI/FormInput/FormInput';
import Button from '../../UI/Button/Button';
import classes from './LoginForm.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { setLoggedUser } from '../../store/slices/userSlice';
import { Link, useNavigate, json } from 'react-router-dom';
import pomodoroLoginLogo from "../../assets/img/brandlogo-white.png";
import {setAuthToken, setExpirationDate} from '../../utils/auth'

interface LoginFormProps {
  onConfirm: () => void;
  onCancel: () => void;
  className: string;
  isRegistration?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({onConfirm, onCancel, className, isRegistration = false}) => {
  const dispatch = useAppDispatch()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const repeatPasswordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState({message: ''})
  const navigate = useNavigate()

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO: Maybe add two way binding instead, to have validatio on inputs.
    const emailInput = emailRef.current!.value;
    const passwordInput = passwordRef.current!.value;

    if (emailInput?.trim().length === 0 || !validateEmail(emailInput)) {
      console.log("invalid email")
      return;
    }
    if (passwordInput?.trim().length === 0) {
      return
    }

    dispatch(
      setLoggedUser({
        email: emailInput,
        password: passwordInput,
      })
    )


    sendRequest({ email: emailInput, password: passwordInput })
  }

  const sendRequest = async (data: { email: string, password: string }) => {
    const baseUrl = '/backend/api/auth/';

    const url = baseUrl + (isRegistration ? 'signup' : 'signin');

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.status === 422 || response.status === 401) {
      setError({message: 'Validation error'})
      return response;
    }

    if (!response.ok) {
      throw json({ message: "Could not register." }, { status: 500 });
    }

    const responseData = await response.json();
    const { token } = responseData;

    setAuthToken(token);
    setExpirationDate();
    onConfirm();
  }

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  const toggleRegistrationHandler = () => {
    if (!isRegistration) {
      navigate('/register')
      return
    } 

    navigate('/login')
  }

  return (
    <Card className={`${className ? classes[className] : ""}`} >
      <>
        <Link to='/'>
          <img src={pomodoroLoginLogo} className={classes["login-container__login-logo"]} alt="login-logo" />
        </Link>
      </>
      <div className={classes["login-container__title"]}>
        {isRegistration ? 'Create Account' : 'Login'}
      </div>
      <form
        action="submit"
        className={classes["login-container__login-form"]}
        onSubmit={onSubmitHandler}
      >
        {error && <p>{error.message}</p>}
        <div className={classes["login-container__email"]}>
          <FormInput
            ref={emailRef}
            htmlFor='email'
            label='Email'
            inputAttr={{
              type: 'text',
              name: 'email',
              defaultValue: '',
              placeholder: 'example@mail.com'
            }}
          />
        </div>
        <div className={classes["login-container__password"]}>
          <FormInput
            ref={passwordRef}
            htmlFor='password'
            label='Password'
            inputAttr={{
              type: 'password',
              name: 'password',
              defaultValue: '',
            }}
          />
        </div>
        {/* {
          isRegistration && (
            <div className={classes["login-container__password"]}>
              <FormInput
                ref={repeatPasswordRef}
                htmlFor='password'
                label='Repeat Password'
                inputAttr={{
                  type: 'password',
                  name: 'password',
                  defaultValue: '',
                }}
              />
            </div>

          )
        } */}
        <div className={classes["login-container__action-buttons"]}>
          <div className={classes["login-container__forgot-password"]}>
            {!isRegistration && <span>Forgot Password</span>}
          </div>
          <Button
            className={classes["login-container__submit"]}
            disabled={false}
            type="submit"
          >

            {isRegistration ? 'Register' : 'Login'}
          </Button>
          <Button
            className={classes["login-container__cancel"]}
            disabled={false}
            onClickHandler={onCancel}
          >
            Cancel
          </Button>
          <div className={classes["login-container__register"]}>
            <span className={classes["login-container__register-question"]}>
              {isRegistration ? 'Already have an account?' : 'Don\'t have an account ?'}
            </span>
            <span className={classes["login-container__create-account-action"]} onClick={toggleRegistrationHandler}>{isRegistration ? 'Login' : 'Create account'}</span>
          </div>
        </div>
      </form>
    </Card>
  )
}


export default LoginForm;