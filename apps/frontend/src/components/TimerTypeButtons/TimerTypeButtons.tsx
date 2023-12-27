import React from 'react';
import Button from '@UI/Button/Button';
import classes from './TimerTypeButtons.module.scss';

type Props = {
  timerType: string;
  handleTimerType: (arg0: string) => void
}

const POMODORO : string = 'pomodoro';
const SHORT_BREAK : string = 'shortbreak';
const LONG_BREAK : string = 'longbreak';

const POMODORO_BTN_LABEL : string = 'Pomodoro';
const SHORT_BREAK_BTN_LABEL : string = 'Short Break';
const LONG_BREAK_BTN_LABEL : string = 'Long Break';

interface ButtonElement {
  className: string;
  handlerArgument: string;
  label: string;
}

export default function TimerTypeButtons({ timerType, handleTimerType }: Props) {
  const buttonsArray: ButtonElement[] = [
    {
      className: `timer-type-buttons-container__btn${timerType === POMODORO ? '--active' : ''}`,
      handlerArgument: POMODORO,
      label: POMODORO_BTN_LABEL
    },
    {
      className: `timer-type-buttons-container__btn${timerType === SHORT_BREAK ? '--active' : ''}`,
      handlerArgument: SHORT_BREAK,
      label: SHORT_BREAK_BTN_LABEL
    },
    {
      className: `timer-type-buttons-container__btn${timerType === LONG_BREAK ? '--active' : ''}`,
      handlerArgument: LONG_BREAK,
      label: LONG_BREAK_BTN_LABEL
    },
  ]
  return (
    <div className={classes['timer-type-buttons-container']}>
      {buttonsArray.map((button) => (
        <Button
          key={button.label}
          className={classes[button.className]}
          onClickHandler={() => handleTimerType(button.handlerArgument)}
        >
          {button.label}
        </Button>
      ))}
    </div>
  )
}