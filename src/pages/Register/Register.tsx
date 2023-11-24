import React, {useState} from 'react'
import LoginModal from '../../components/LoginForm/LoginForm';
import Modal from '../../UI/Modal/Modal';
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();
  const [showRegisterUserModal, setShowRegisterUserModal] = useState<boolean>(false);

  const toggleUserModal = () => {
    setShowRegisterUserModal(!showRegisterUserModal);
    navigate('/')
  }

  return (
    (
      <Modal onCancel={toggleUserModal}>
        <LoginModal
          onConfirm={toggleUserModal}
          onCancel={toggleUserModal}
          className="login-container"
          isRegistration={true}
        />
      </Modal>
    )
  )
}