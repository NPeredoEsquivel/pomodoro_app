import React, { useState } from "react";
import classes from "./Header.module.scss";
import Configuration from "../../assets/img/config-white.png";
//import Graph from "../../assets/img/graph-white.png";
import AppIcon from "../../assets/img/icon-white.png";
import User from "../../assets/img/user-white.png";
import ConfigurationModal from "../ConfigurationModal/ConfigurationModal";
import LoginModal from "../LoginModal/LoginModal";
import Modal from "../../UI/Modal/Modal";

const Header: React.FC = () => {
  const [showConfigurationModal, setShowConfigurationModal] = useState<boolean>(false);
  const [showUserLoginModal, setUserLoginModal] = useState<boolean>(false);

  const toggleConfigurationModal = () => {
    setShowConfigurationModal(!showConfigurationModal);
  }
  
  const toggleUserModal = () => {
    setUserLoginModal(!showUserLoginModal);
  }

  return (
    <>
      {showConfigurationModal ? (
        <Modal renderContent={true} onCancel={toggleConfigurationModal}>
          <ConfigurationModal
            onConfirm={toggleConfigurationModal}
            onCancel={toggleConfigurationModal}
            className="configuration-container"
          />
        </Modal>
      ) : (
        <></>
      )}
      {showUserLoginModal ? (
        <Modal renderContent={true} onCancel={toggleUserModal}>
          <LoginModal
            onConfirm={toggleUserModal}
            onCancel={toggleUserModal}
            className="login-container"
          />
        </Modal>
      ) : (
        <></>
      )}
      <header className={classes.container}>
        <div className={classes.app}>
          <div className={classes["app__icon"]}>
            <img src={AppIcon} alt="app-icon" />
          </div>
          <span className={classes["app__name"]}>Pomofocus</span>
        </div>
        <div className={classes.actions}>
          {/* <div className={classes.report}>
            <img src={Graph} alt="graph-icon" />
            <span>Report</span>
          </div> */}
          <div
            className={classes.setting}
            onClick={toggleConfigurationModal}
          >
            <img src={Configuration} alt="configuration-icon" />
            <span>Setting</span>
          </div>
          <div 
            className={classes.login}
            onClick={toggleUserModal}          
          >
            <img src={User} alt="user-icon" />
            <span>Login</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
