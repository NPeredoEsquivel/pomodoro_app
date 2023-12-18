import React from 'react';
import classes from './UpdateTimerButton.module.scss';
import Button from '../../../src/UI/Button/Button';

type Props = {
  timerType: string;
  handlePauseTimer: () => void;
  handleResetTimer: () => void;
  handleStartTimer: () => void;
  isTimerRunning: boolean;
  timerSeconds: number;
}

interface ButtonActions {
  buttonHandler: { (): void } | null;
  action: string;
}

export default function UpdateTimerButton(props: Props) {

  const getButtonAction = (): ButtonActions => {
    const { isTimerRunning, timerSeconds, handlePauseTimer, handleResetTimer, handleStartTimer } = props;
    const buttonAction: ButtonActions = { buttonHandler: null, action: "" };
    if (isTimerRunning) {
      buttonAction.buttonHandler = handlePauseTimer;
      buttonAction.action = "PAUSE";
    } else {
      if (timerSeconds === 0) {
        buttonAction.buttonHandler = handleResetTimer;
        buttonAction.action = "RESET";
      } else {
        buttonAction.buttonHandler = handleStartTimer;
        buttonAction.action = "START";
      }
    }
    return buttonAction;
  };

  const getButtonProperty = (property: string) => {
    const buttonProperties = getButtonAction();
    return buttonProperties[property];
  };

  const buttonHandler = getButtonProperty("buttonHandler");
  const buttonAction = getButtonProperty("action");


  return (
    <div className={classes['update-timer-button-container']}>
      <Button
        className={classes[`update-timer-button-container__btn--${props.timerType}`]}
        disabled={false}
        onClickHandler={buttonHandler}
      >
        {buttonAction}
      </Button>
    </div>
  )
}