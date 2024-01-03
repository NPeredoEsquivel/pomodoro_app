import React from 'react';
import Button from '@/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import classes from './LoginButtons.module.scss';

type LoginButtonProps = {
  buttonLabel?: string;
  onCancel?: () => void;
  isRegistration?: boolean;
  toggleRegistrationHandler?: () => void;
}

const LoginButtons: React.FC<LoginButtonProps> = (props) => {
  const navigate = useNavigate();

  const toggleRegistrationHandler = () => {
    if (!props.isRegistration) {
      navigate('/register')
      return
    }
    navigate('/login')
  }


  const forgotPassword = (
    <div className={classes["login-buttons__forgot-password"]}>
      {!props.isRegistration && <span>Forgot Password</span>}
    </div>
  )
  const manageAccount = (
    <div className={classes["login-buttons__register"]}>
      <span className={classes["login-buttons__register-question"]}>
        {props.isRegistration ? 'Already have an account?' : 'Don\'t have an account ?'}
      </span>
      <span className={classes["login-buttons__create-account-action"]} onClick={toggleRegistrationHandler}>{props.isRegistration ? 'Login' : 'Create account'}</span>
    </div>
  )

  return (
    <div className={classes["login-buttons"]}>
      {forgotPassword}
      <Button
        className={classes["login-buttons__submit"]}
        disabled={false}
        type="submit"
      >

        {props.buttonLabel}
      </Button>
      <Button
        className={classes["login-buttons__cancel"]}
        disabled={false}
        onClickHandler={props.onCancel}
      >
        Cancel
      </Button>
      {manageAccount}
    </div>
  )
}

export default LoginButtons;