import React, {Fragment, useState} from 'react'
import LoginForm from '@/components/LoginScreen/LoginForm/LoginForm';
import Header from '@/components/LoginScreen/LoginHeader/Header';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();
  const [showRegisterUserModal, setShowRegisterUserModal] = useState<boolean>(false);

  const toggleUserModal = () => {
    setShowRegisterUserModal(!showRegisterUserModal);
    navigate('/')
  }

  return (
      <Fragment>
        <Header isRegistration={true}/>
        <LoginForm
          onConfirm={toggleUserModal}
          onCancel={toggleUserModal}
          className="login-container"
          isRegistration={true}
        />
      </Fragment>
  )
}