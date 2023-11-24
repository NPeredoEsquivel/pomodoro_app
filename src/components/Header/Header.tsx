import React, { useState } from "react";
import classes from "./Header.module.scss";
import Configuration from "../../assets/img/config-white.png";
import Graph from "../../assets/img/graph-white.png";
import AppIcon from "../../assets/img/icon-white.png";
import User from "../../assets/img/user-white.png";
import Modal from "../../UI/Modal/Modal";
import ConfigurationModal from "../ConfigurationModal/ConfigurationModal";

const Header: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  //const modalBody = <div className={classes["modal-setting-container"]}></div>;
  const onConfirm = () => {
    setShowModal(false);
  };
  const onCancel = () => {
    setShowModal(false);
  };
  return (
    <>
      {showModal && (
        <Modal renderContent={true} onCancel={onCancel}>
          <ConfigurationModal
            onConfirm={onConfirm}
            onCancel={onCancel}
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
            onClick={() => setShowModal(!showModal)}
          >
            <img src={Configuration} alt="configuration-icon" />
            <span>Setting</span>
          </div>
          <div className={classes.login}>
            <img src={User} alt="user-icon" />
            <span>Login</span>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
