import React from 'react';
import classes from './UpdateTimerButton.module.scss';
import Button from '../../../src/UI/Button/Button';

type Props = {
  timerType: string;
  buttonHandler: () => void;
  buttonAction: string;
}

export default function UpdateTimerButton({timerType, buttonHandler, buttonAction}: Props) {
  return (
    <div className={classes['update-timer-button-container']}>
      <Button
        className={classes[`update-timer-button-container__btn--${timerType}`]}
        disabled={false}
        onClickHandler={buttonHandler}
      >
        {buttonAction}
      </Button>
    </div>
  )
}