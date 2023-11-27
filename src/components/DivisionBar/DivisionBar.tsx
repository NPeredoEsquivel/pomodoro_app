import React from 'react';
import classes from './DivisionBar.module.scss';

type Props = {
  timeElapsed: number;
  timerSeconds: number;
}

export default function DivisionBar(props: Props) {
  const {timeElapsed, timerSeconds} = props;
  const width = timeElapsed > 0
    ? (
      (100 * timeElapsed) /
      (timerSeconds + timeElapsed)
    ).toFixed(2)
    : '0';
  return (
    <div className={classes['division-bar-container']}>
      <div className={classes['division-bar-container__normal-division']} />
      <div
        className={classes['division-bar-container__timed-division']}
        style={{
          width: `${width + "%"}`,
        }}
      ></div>
    </div>
  )
}