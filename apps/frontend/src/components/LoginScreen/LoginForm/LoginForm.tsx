import React, { useRef, useState } from 'react';
import Card from '@UI/Card/Card';
import FormInput from '@UI/FormInput/FormInput';
import classes from './LoginForm.module.scss';
import { useAppDispatch } from '@store/hooks';
import { setLoggedUser } from '@store/slices/userSlice';
import { json } from 'react-router-dom';
import {setAuthToken, setExpirationDate} from '@utils/auth'
import Error from '@components/Error/Error';
import LoginButtons from '@components/LoginButtons/LoginButtons';

interface LoginFormProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
  isRegistration?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({onConfirm, onCancel, className, isRegistration = false}) => {
  const dispatch = useAppDispatch()
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState({message: ''})

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

    if (onConfirm) {
      onConfirm();
    }
  }

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  return (
    <Card className={`${className ? classes[className] : ""}`} >
      <form
        action="submit"
        className={classes["login-container__login-form"]}
        onSubmit={onSubmitHandler}
      >
        {error.message && <Error errorMessage={error.message} />}
        <FormInput
          ref={emailRef}
          htmlFor='email'
          label='Email'
          className={classes["login-container__email"]}
          inputAttr={{
            type: 'text',
            name: 'email',
            defaultValue: '',
            placeholder: 'example@mail.com'
          }}
        />
        <FormInput
          ref={passwordRef}
          htmlFor='password'
          label='Password'
          className={classes["login-container__password"]}
          inputAttr={{
            type: 'password',
            name: 'password',
            defaultValue: '',
          }}
        />
          <LoginButtons
            isRegistration={isRegistration}
            buttonLabel={isRegistration ? 'Register' : 'Login'}
            onCancel={onCancel}
          />
      </form>
    </Card>
  )
}


export default LoginForm;