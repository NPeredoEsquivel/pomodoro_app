import React from 'react';
import classes from './DivisionBar.module.scss';

type Props = {
  width: string;
}

export default function DivisionBar({width}: Props) {
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