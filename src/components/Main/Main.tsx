import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import TaskList from "./TaskList/TaskList";
import classes from "./Main.module.scss";
import Modal from "../../UI/Modal/Modal";
import audioClick from "../../assets/audio/click_audio.wav";
import endTimerAlarm from "../../assets/audio/clock_alarm.wav";

const TIMER_CONFIG = {};
const POMODORO = "pomodoro";
const SHORT_BREAK = "shortbreak";
const LONG_BREAK = "longbreak";

TIMER_CONFIG[POMODORO] = 2700;
TIMER_CONFIG[SHORT_BREAK] = 300;
TIMER_CONFIG[LONG_BREAK] = 900;

Object.freeze(TIMER_CONFIG);
interface IMainProps {
  handleBackgroundColor: (backgroundColorToSet: string) => void;
}
interface ButtonActions {
  buttonHandler: { (): void } | null;
  action: string;
}

interface IMainState {
  timerType: string;
  isTimerRunning: boolean;
  timerSeconds: number;
  timeElapsed: number;
  timerIntervalId: number;
  showModal: boolean;
  transitionTimerType: string;
}

const defaultState = {
  timerType: POMODORO,
  isTimerRunning: false,
  timerSeconds: 2700,
  timeElapsed: 0,
  timerIntervalId: 0,
  showModal: false,
  transitionTimerType: POMODORO,
};

const Main: React.FC<IMainProps> = ({ handleBackgroundColor }) => {
  const clickAudio = new Audio(audioClick);
  const endTimerAudio = new Audio(endTimerAlarm);
  const [state, setState] = useState<IMainState>(defaultState);

  useEffect(() => {
    const { timerSeconds, isTimerRunning, timerIntervalId } = state;
    if (timerSeconds === 0 && isTimerRunning) {
      endTimerAudio.play();
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
    clickAudio.play();
    const interval = obtainInterval();
    setState({ ...state, timerIntervalId: interval, isTimerRunning: true });
  };

  const handlePauseTimer = () => {
    clickAudio.play();
    const { timerIntervalId } = state;
    if (timerIntervalId) {
      setState({ ...state, isTimerRunning: false });
    }
    clearInterval(timerIntervalId);
  };

  const handleResetTimer = () => {
    const { timerType } = state;
    setState({ ...state, timerSeconds: TIMER_CONFIG[timerType] });
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

  const getButtonAction = () => {
    const { isTimerRunning, timerSeconds } = state;
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

  const getButtonProperty = (property) => {
    const buttonProperties = getButtonAction();
    return buttonProperties[property];
  };

  const buttonHandler = getButtonProperty("buttonHandler");
  const buttonAction = getButtonProperty("action");

  return (
    <main className={classes[state.timerType]}>
      {state.showModal ? (
        <Modal
          title={changeTimerTypeModalTitle}
          body={changeTimerTypeModalBody}
          onConfirm={onConfirm}
          onCancel={onCancel}
          timerType={state.timerType}
        ></Modal>
      ) : null}

      <div className={classes.division}>
        <div className={classes["normal_division"]} />
        <div
          className={classes["timed_division"]}
          style={{
            width: `${width + "%"}`,
          }}
        ></div>
      </div>
      <Card className={classes["timer_container"]}>
        <div className={classes["timer_container__change-timertype_buttons"]}>
          <Button
            className={`${
              state.timerType === POMODORO
                ? classes["btn--active"]
                : classes["btn"]
            }`}
            disabled={false}
            onClickHandler={() => handleTimerType(POMODORO)}
          >
            Pomodoro
          </Button>
          <Button
            className={`${
              state.timerType === SHORT_BREAK ? classes.active : ""
            } ${classes["btn"]}`}
            disabled={false}
            onClickHandler={() => handleTimerType(SHORT_BREAK)}
          >
            Short Break
          </Button>
          <Button
            className={`${
              state.timerType === LONG_BREAK ? classes.active : ""
            } ${classes["btn"]}`}
            disabled={false}
            onClickHandler={() => handleTimerType(LONG_BREAK)}
          >
            Long Break
          </Button>
        </div>
        <div className={classes["timer_container__running_time"]}>
          {`${minutes}:${seconds}`}
        </div>
        <div className={classes["timer_container__update_timer_button"]}>
          <Button
            className={classes[`btn__${state.timerType}`]}
            disabled={false}
            onClickHandler={buttonHandler}
          >
            {buttonAction}
          </Button>
        </div>
      </Card>
      <TaskList />
    </main>
  );
};

export default Main;
