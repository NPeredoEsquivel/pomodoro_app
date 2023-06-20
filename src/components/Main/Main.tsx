import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import TaskList from "./TaskList/TaskList";
import classes from "./Main.module.scss";
import Modal from "src/UI/Modal/Modal";
import audioClick from "../../assets/audio/click_audio.wav";
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
type IMainState = {
  timerType: string;
  isTimerRunning: boolean;
  timerSeconds: number;
  timeElapsed: number;
  timerIntervalId: number;
  showModal: boolean;
  transitionTimerType: string;
};

const defaultState = {
  timerType: "pomodoro",
  isTimerRunning: false,
  timerSeconds: 2700,
  timeElapsed: 0,
  timerIntervalId: 0,
  showModal: false,
  transitionTimerType: "pomodoro",
};

const Main: React.FC<IMainProps> = ({ handleBackgroundColor }) => {
  //const audio = HTMLAudioElement; /*I think this is for TypeScript
  const audio = new Audio(audioClick);
  const [state, setState] = useState<IMainState>(defaultState);

  useEffect(() => {
    const { timerSeconds, isTimerRunning, timerIntervalId } = state;
    if (timerSeconds === 0 && isTimerRunning) {
      clearInterval(timerIntervalId);
      setState({ ...state, isTimerRunning: false });
    }
  }, [state.timerSeconds]);

  useEffect(() => {
    updateTimerType(state.timerType);
  }, [state.timerType]);

  const updateTimerType = (timerType: string) => {
    setState({
      ...state,
      isTimerRunning: false,
      timerSeconds: TIMER_CONFIG[timerType],
    });
  };

  const obtainInterval = () => {
    const interval = window.setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        timeElapsed: prevState.timeElapsed + 1,
        timerSeconds: prevState.timerSeconds - 1,
      }));
    }, 1000);
    return interval;
  };

  const handleStartTimer = () => {
    audio.play();
    const interval = obtainInterval();
    setState({ ...state, timerIntervalId: interval, isTimerRunning: true });
  };

  const handlePauseTimer = () => {
    audio.play();
    const { timerIntervalId } = state;
    if (timerIntervalId) {
      setState({ ...state, isTimerRunning: false });
    }
    clearInterval(timerIntervalId);
  };

  const handleTimerType = (timerType: string) => {
    const { isTimerRunning, timerIntervalId } = state;
    if (isTimerRunning) {
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
      setState({
        ...state,
        showModal: true,
        transitionTimerType: timerType,
        isTimerRunning: false,
      });
    } else {
      setState({ ...state, timerType });
      handleBackgroundColor(timerType);
      if (timerIntervalId) {
        clearInterval(timerIntervalId);
      }
    }
  };

  const onConfirm = () => {
    setState({
      ...state,
      showModal: false,
      timerType: state.transitionTimerType,
    });

    handleBackgroundColor(state.transitionTimerType);
  };

  const onCancel = () => {
    const { timerIntervalId } = state;
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
    }
    const interval = obtainInterval();
    setState({
      ...state,
      showModal: false,
      timerIntervalId: interval,
      isTimerRunning: true,
    });
  };

  const minutes = parseInt((state.timerSeconds / 60).toString());
  const seconds =
    (state.timerSeconds % 60).toString().length === 1
      ? `0${state.timerSeconds % 60}`
      : state.timerSeconds % 60;
  const changeTimerTypeModalTitle = "Change timer type";
  const changeTimerTypeModalBody = "Are you sure of changing the timer type?";
  const width = state.isTimerRunning
    ? (
        (100 * state.timeElapsed) /
        (state.timerSeconds + state.timeElapsed)
      ).toFixed(2)
    : 0;

  return (
    <main>
      {state.showModal ? (
        <Modal
          title={changeTimerTypeModalTitle}
          body={changeTimerTypeModalBody}
          onConfirm={() => onConfirm()}
          onCancel={() => onCancel()}
          timerType={state.timerType}
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
              state.timerType === "pomodoro"
                ? classes["btn--active"]
                : classes["btn"]
            }`}
            disableButton={false}
            onClickHandler={() => handleTimerType("pomodoro")}
          >
            Pomodoro
          </Button>
          <Button
            classProps={`${
              state.timerType === "shortbreak" ? classes.active : ""
            } ${classes["btn"]}`}
            disableButton={false}
            onClickHandler={() => handleTimerType("shortbreak")}
          >
            Short Break
          </Button>
          <Button
            classProps={`${
              state.timerType === "longbreak" ? classes.active : ""
            } ${classes["btn"]}`}
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
            classProps={classes[`btn--${state.timerType}`]}
            disableButton={false}
            onClickHandler={
              state.isTimerRunning ? handlePauseTimer : handleStartTimer
            }
          >
            {state.isTimerRunning ? "PAUSE" : "START"}
          </Button>
        </div>
      </Card>
      <TaskList />
    </main>
  );
};

export default Main;
