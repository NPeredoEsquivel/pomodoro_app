import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import TaskList from "./TaskList/TaskList";
import classes from "./Main.module.scss";
import Modal from "src/UI/Modal/Modal";
import audioClick from "../../assets/audio/click_audio.wav";
import endTimerAlarm from "../../assets/audio/clock_alarm.wav";

const TIMER_CONFIG = {};
const POMODORO = "pomodoro";
const SHORT_BREAK = "shortbreak";
const LONG_BREAK = "longbreak";

TIMER_CONFIG[POMODORO] = 10;
TIMER_CONFIG[SHORT_BREAK] = 300;
TIMER_CONFIG[LONG_BREAK] = 900;

Object.freeze(TIMER_CONFIG);
interface IMainProps {
  handleBackgroundColor: (backgroundColorToSet: string) => void;
}

const Main: React.FC<IMainProps> = ({ handleBackgroundColor }) => {
  const clickAudio = new Audio(audioClick);
  const endTimerAudio = new Audio(endTimerAlarm);
  const [timerType, setTimerType] = useState<string>("pomodoro");
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(2700);
  const [timeElapsed, setTimeElapsed] =
    useState<number>(0); /* Used to calculate reproduction bar */
  const [timerIntervalId, setTimerIntervalId] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [transitionTimerType, setTransitionTimerType] =
    useState<string>("pomodoro");

  useEffect(() => {
    if (timerSeconds === 0 && isTimerRunning) {
      endTimerAudio.play();
      clearInterval(timerIntervalId);
      setIsTimerRunning(false);
    }

    // TODO: Clear interval timer.
  }, [timerSeconds]);

  useEffect(() => {
    updateTimerType(timerType);
  }, [timerType]);

  const updateTimerType = (timerType: string) => {
    setIsTimerRunning(false);
    setTimerSeconds(TIMER_CONFIG[timerType]);
  };

  const obtainInterval = () => {
    const interval = window.setInterval(() => {
      setTimeElapsed((prevTimeElapsed) => prevTimeElapsed + 1);
      setTimerSeconds((prevTimeElapsed) => prevTimeElapsed - 1);
    }, 1000);
    return interval;
  };

  const handleStartTimer = () => {
    clickAudio.play();
    const interval = obtainInterval();
    setTimerIntervalId(interval);
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    clickAudio.play();
    if (timerIntervalId) {
      setIsTimerRunning(false);
    }
    clearInterval(timerIntervalId);
  };

  const handleTimerType = (timerType: string) => {
    if (isTimerRunning) {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
      setShowModal(true);
      setTransitionTimerType(timerType);
      setIsTimerRunning(false);
    } else {
      setTimerType(timerType);
      handleBackgroundColor(timerType);
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    }
  };

  const onConfirm = () => {
    setShowModal(false);
    setTimerType(transitionTimerType);

    handleBackgroundColor(transitionTimerType);
  };

  const onCancel = () => {
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    const interval = obtainInterval();
    setShowModal(false);
    setTimerIntervalId(interval);
    setIsTimerRunning(true);
  };
  const minutes = parseInt((timerSeconds / 60).toString());
  const seconds =
    (timerSeconds % 60).toString().length === 1
      ? `0${timerSeconds % 60}`
      : timerSeconds % 60;
  const changeTimerTypeModalTitle = "Change timer type";
  const changeTimerTypeModalBody = "Are you sure of changing the timer type?";
  const width = isTimerRunning
    ? ((100 * timeElapsed) / (timerSeconds + timeElapsed)).toFixed(2)
    : 0;

  return (
    <main>
      {showModal ? (
        <Modal
          title={changeTimerTypeModalTitle}
          body={changeTimerTypeModalBody}
          onConfirm={() => onConfirm()}
          onCancel={() => onCancel()}
          timerType={timerType}
        ></Modal>
      ) : null}

      <div className={classes.division}>
        <div className={`${classes["normal-division"]} `} />
        <div
          className={`${classes["timed-division"]}`}
          style={{
            width: `${width + "%"}`,
          }}
        ></div>
      </div>
      <Card className={classes[`${"timer-container"}`]}>
        <div className={classes["timer-container__change-timertype-buttons"]}>
          <Button
            classProps={`${
              timerType === "pomodoro" ? classes["btn--active"] : classes["btn"]
            }`}
            disableButton={false}
            onClickHandler={() => handleTimerType("pomodoro")}
          >
            Pomodoro
          </Button>
          <Button
            classProps={`${timerType === "shortbreak" ? classes.active : ""} ${
              classes["btn"]
            }`}
            disableButton={false}
            onClickHandler={() => handleTimerType("shortbreak")}
          >
            Short Break
          </Button>
          <Button
            classProps={`${timerType === "longbreak" ? classes.active : ""} ${
              classes["btn"]
            }`}
            disableButton={false}
            onClickHandler={() => handleTimerType("longbreak")}
          >
            Long Break
          </Button>
        </div>
        <div className={classes["timer-container__running-time"]}>
          {`${minutes}:${seconds}`}
        </div>
        <div className={classes["timer-container__update-timer-button"]}>
          <Button
            classProps={classes[`btn--${timerType}`]}
            disableButton={false}
            onClickHandler={
              isTimerRunning ? handlePauseTimer : handleStartTimer
            }
          >
            {isTimerRunning ? "PAUSE" : "START"}
          </Button>
        </div>
      </Card>
      <TaskList />
    </main>
  );
};

export default Main;
