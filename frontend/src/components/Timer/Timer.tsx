import React from "react";
import classes from "./Timer.module.scss";

interface TimerProps {
  timer: string;
}

const Timer: React.FC<TimerProps> = ({ timer }) => {
  return (
    <div className={classes["timer_container__running_time"]}>{timer}</div>
  );
};

export default Timer;
