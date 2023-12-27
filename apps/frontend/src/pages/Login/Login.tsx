import React, {useState} from 'react'
import LoginForm from '@components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [showUserLoginModal, setUserLoginModal] = useState<boolean>(false);

  const toggleUserModal = () => {
    setUserLoginModal(!showUserLoginModal);

    navigate('/')
  }

  return (
      <LoginForm
        onConfirm={toggleUserModal}
        onCancel={toggleUserModal}
        className="login-container"
      />
  )
}