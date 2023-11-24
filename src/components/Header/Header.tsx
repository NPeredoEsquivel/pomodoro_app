import React, { useState } from "react";
import classes from "./Header.module.scss";
import Configuration from "../../assets/img/config-white.png";
//import Graph from "../../assets/img/graph-white.png";
import AppIcon from "../../assets/img/icon-white.png";
import User from "../../assets/img/user-white.png";
import ConfigurationModal from "../ConfigurationModal/ConfigurationModal";
import Modal from "../../UI/Modal/Modal";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showConfigurationModal, setShowConfigurationModal] = useState<boolean>(false);

  const toggleConfigurationModal = () => {
    setShowConfigurationModal(!showConfigurationModal);
  }
  
  const toggleUserModal = () => {
    navigate('/login')
  }

  return (
    <>
      {showConfigurationModal && (
        <Modal renderContent={true} onCancel={toggleConfigurationModal}>
          <ConfigurationModal
            onConfirm={toggleConfigurationModal}
            onCancel={toggleConfigurationModal}
            className="configuration-container"
          />
        </Modal>
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
