import React, {Fragment, useState} from 'react'
import LoginForm from '@/components/LoginScreen/LoginForm/LoginForm';
import Header from '@/components/LoginScreen/LoginHeader/Header';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [showUserLoginModal, setUserLoginModal] = useState<boolean>(false);

  const toggleUserModal = () => {
    setUserLoginModal(!showUserLoginModal);
    navigate('/')
  }

  return (
    <Fragment>
      <Header/>
      <LoginForm
        onConfirm={toggleUserModal}
        onCancel={toggleUserModal}
        className="login-container"
      />
    </Fragment>
  )
}