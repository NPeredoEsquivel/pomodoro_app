import React, { useRef } from 'react';
import Card from '../../UI/Card/Card';
import FormInput from '../../UI/FormInput/FormInput';
import Button from '../../UI/Button/Button';
import classes from './LoginForm.module.scss';
import { useAppDispatch } from '../../store/hooks';
import { setLoggedUser } from '../../store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import pomodoroLoginLogo from "../../assets/img/brandlogo-white.png";

interface LoginFormProps {
  onConfirm: () => void;
  onCancel: () => void;
  className: string;
  isRegistration?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({onConfirm, onCancel, className, isRegistration = false}) => {
  const dispatch = useAppDispatch()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const repeatPasswordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO: Maybe add two way binding instead, to have validatio on inputs.
    const usernameInput = usernameRef.current!.value;
    const passwordInput = passwordRef.current!.value;

    if (usernameInput?.trim().length === 0 || !validateEmail(usernameInput)) {
      console.log("invalid email")
      return;
    }
    if (passwordInput?.trim().length === 0) {
      return
    }

    dispatch(
      setLoggedUser({
        username: usernameInput,
        password: passwordInput,
      })
    )


    onConfirm();
    return;
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
        <div className={classes["login-container__username"]}>
          <FormInput
            ref={usernameRef}
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
        {
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
        }
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