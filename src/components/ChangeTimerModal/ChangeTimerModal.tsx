import React from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./ChangeTimerModal.module.scss";

interface ChangeTimerModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  className?: string;
}

const ChangeTimerModal: React.FC<ChangeTimerModalProps> = (props) => {
  return (
    <Card className={`${props.className ? classes[props.className] : ""}`}>
      <header className={classes.modal__title}>Change timer type</header>
      <div className={classes.modal__body}>
        Are you sure of changing the timer type?
      </div>
      <footer className={classes.modal__footer}>
        <Button
          className={classes.modal__footer__button}
          disabled={false}
          onClickHandler={props.onConfirm}
        >
          Accept
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
  );
};
export default ChangeTimerModal;
