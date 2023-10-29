import React, {useRef} from 'react';
import Card from '../../Card/Card';
import FormInput from '../../../UI/FormInput/FormInput';
import Button from '../../../UI/Button/Button';
import classes from './LoginModal.module.scss';
import { useAppDispatch } from '../../../store/hooks';
import { setLoggedUser } from '../../../store/slices/userSlice';

interface LoginModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  className: string;
}

const LoginModal: React.FC <LoginModalProps> = (props) => {
  const dispatch = useAppDispatch()
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //TODO: Maybe add two way binding instead, to have validatio on inputs.
    const usernameInput = usernameRef.current!.value;
    const passwordInput = passwordRef.current!.value;

    if (usernameInput?.trim().length === 0 || !validateEmail(usernameInput)) {
      console.log("invalid email")
      return;
    }
    if(passwordInput?.trim().length === 0) {
      return
    }

    dispatch(
      setLoggedUser({
        username: usernameInput,
        password: passwordInput,
      })
    )


    props.onConfirm();
    return;
  }

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  return (
    <Card className={`${props.className ? classes[props.className] : ""}`} >
      <form 
        action="submit"
        className="login-form"
        onSubmit={onSubmitHandler}
      >
        <div className="login-form-container">
          <div className="login-form-container__username">
            <FormInput
              ref={usernameRef}
              htmlFor='email'
              label='Email'
              inputAttr={{
                type: 'text',
                name: 'email',
                defaultValue: '',
              }}
            />            
          </div>
          <div className="login-form-container__password">
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
          <div className="login-form-container__action-buttons">
            <Button
              className={classes["action-buttons__cancel"]}
              disabled={false}
              onClickHandler={props.onCancel}
            >
            Cancel
          </Button>
          <Button
            className={classes["action-buttons__submit"]}
            disabled={false}
            type="submit"
            >
            OK
          </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}


export default LoginModal;