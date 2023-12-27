import React, {useState} from 'react'
import LoginForm from '@components/LoginForm/LoginForm';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();
  const [showRegisterUserModal, setShowRegisterUserModal] = useState<boolean>(false);

  const toggleUserModal = () => {
    setShowRegisterUserModal(!showRegisterUserModal);
    navigate('/')
  }

  return (
      <LoginForm
        onConfirm={toggleUserModal}
        onCancel={toggleUserModal}
        className="login-container"
        isRegistration={true}
      />
  )
}