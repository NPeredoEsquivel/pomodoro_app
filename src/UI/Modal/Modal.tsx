import React, { ReactNode } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.scss";
import Spinner from "../Spinner/Spinner";
import classNames from "classnames";

interface BackdropProps {
  onCancel: () => void;
}

interface ModalOverlayProps {
  renderContent?: boolean;
  children: ReactNode;
}

interface ModalProps extends BackdropProps, ModalOverlayProps {}

const Backdrop: React.FC<BackdropProps> = ({ onCancel }) => {
  return <div onClick={onCancel} className={classes.backdrop}></div>;
};

const ModalOverlay: React.FC<ModalOverlayProps> = ({
  renderContent,
  children,
}) => {
  //Here the children is being rendered if the content is ready to render
  return (
    <div className={classes.modal}>
      {renderContent ? children : <Spinner />}
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ onCancel, renderContent, children }) => {
  const portalBackdrop = document.getElementById("backdrop-root");
  const modalOverlay = document.getElementById("overlay-root");

  const portalBackdropElement: HTMLElement = portalBackdrop as HTMLElement;
  const modalOverlayElement: HTMLElement = modalOverlay as HTMLElement;
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onCancel={onCancel} />,
        portalBackdropElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay renderContent={renderContent} children={children} />,
        modalOverlayElement
      )}
    </>
  );
};

export default Modal;
