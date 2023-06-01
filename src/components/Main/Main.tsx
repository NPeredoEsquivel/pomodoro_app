import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import TaskList from "./TaskList/TaskList";
import classes from "./Main.module.scss";
import Modal from "src/UI/Modal/Modal";
import audioClick from "../../assets/audio/click_audio.wav";
import ChangeTimerModal from "src/UI/Modal/ChangeTimerModal/ChangeTimerModal";
//import tasks from '../../assets/data/tasks.js';

const TIMER_CONFIG = {};
const POMODORO = "pomodoro";
const SHORT_BREAK = "shortbreak";
const LONG_BREAK = "longbreak";

TIMER_CONFIG[POMODORO] = 3600;
TIMER_CONFIG[SHORT_BREAK] = 300;
TIMER_CONFIG[LONG_BREAK] = 900;

Object.freeze(TIMER_CONFIG);
interface IMainProps {
  handleBackgroundColor: (backgroundColorToSet: string) => void;
}

interface IMainState {
  timerType: string;
  resetTimer: boolean;
  isTimerRunning: boolean;
  timerSeconds: number;
  timeElapsed: number;
  timerIntervalId: number;
  showModal: boolean;
  transitionTimerType: string;
}

const Main: React.FC<IMainProps> = ({ handleBackgroundColor }) => {
  //const audio = HTMLAudioElement; /*I think this is for TypeScript
  const audio = new Audio(audioClick);
  const [timerType, setTimerType] = useState<string>("pomodoro");
  const [resetTimer, setResetTimer] = useState<boolean>(false);
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
      clearInterval(timerIntervalId);
      setIsTimerRunning(false);
    }
  }, [timerSeconds]);

  useEffect(() => {
    updateTimerType(timerType);
  }, [timerType]);

  const updateTimerType = (timerType: string) => {
    setResetTimer(true);
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
    audio.play();
    const interval = obtainInterval();
    setTimerIntervalId(interval);
    setIsTimerRunning(true);
  };

  const handlePauseTimer = () => {
    audio.play();
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
  const width = isTimerRunning
    ? ((100 * timeElapsed) / (timerSeconds + timeElapsed)).toFixed(2)
    : 0;
  return (
    <main>
      {showModal ? (
        <Modal renderContent={!!timerType} onCancel={onCancel}>
          <ChangeTimerModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            className={timerType}
          />
        </Modal>
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
