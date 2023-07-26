import React from "react";
import ReactDom from "react-dom";
import Card from "../Card/Card";
import Button from "../Button/Button";
import classes from "./Modal.module.scss";
import Spinner from "../Spinner/Spinner";

type BackdropProps = {
  onCancel: () => void;
};

type ModalProps = {
  title: string;
  body: string;
  onConfirm: () => void;
  onCancel: () => void;
  timerType?: string;
};

const Backdrop: React.FC<BackdropProps> = ({ onCancel }) => {
  return <div onClick={onCancel} className={classes.backdrop}></div>;
};

const ModalOverlay: React.FC<ModalProps> = (props) => {
  return (
    <>
      {props.timerType ? (
        <Card className={`${classes.modal} ${classes[props.timerType]}`}>
          <header className={classes.modal__title}>{props.title}</header>
          <div className={classes.modal__body}>{props.body}</div>
          <footer className={classes.modal__footer}>
            <Button
              className={classes.modal__footer__button}
              disabled={false}
              onClickHandler={props.onConfirm}
            >
              Ok
            </Button>
            <Button
              className={classes.modal__footer__button}
              disabled={false}
              onClickHandler={props.onCancel}
            >
              Cancel
            </Button>
          </footer>
        </Card>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const Modal: React.FC<ModalProps> = (props) => {
  const portalBackdrop = document.getElementById("backdrop-root");
  const modalOverlay = document.getElementById("overlay-root");

  const portalBackdropElement: HTMLElement = portalBackdrop as HTMLElement;
  const modalOverlayElement: HTMLElement = modalOverlay as HTMLElement;
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop onCancel={props.onCancel} />,
        portalBackdropElement
      )}
      {ReactDom.createPortal(
        <ModalOverlay
          title={props.title}
          body={props.body}
          onConfirm={props.onConfirm}
          onCancel={props.onCancel}
          timerType={props.timerType}
        />,
        modalOverlayElement
      )}
    </>
  );
};

export default Modal;
