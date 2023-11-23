import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import TaskList from "../TaskList/TaskList";
import classes from "./Main.module.scss";
import Modal from "../../UI/Modal/Modal";
import audioClick from "../../assets/audio/click_audio.wav";
import ChangeTimerModal from "../ChangeTimerModal/ChangeTimerModal";
import endTimerAlarm from "../../assets/audio/clock_alarm.wav";
import Timer from "../Timer/Timer";
import classNames from "classnames";
import { selectTimerConfiguration } from "../../store/slices/timerConfigSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setTimerType, selectTimerType } from "../../store/slices/timerTypeSlice";

const TIMER_CONFIG = {};
const POMODORO = "pomodoro";
const SHORT_BREAK = "shortbreak";
const LONG_BREAK = "longbreak";

TIMER_CONFIG[POMODORO] = 2700;
TIMER_CONFIG[SHORT_BREAK] = 300;
TIMER_CONFIG[LONG_BREAK] = 900;

Object.freeze(TIMER_CONFIG);
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
  timeElapsed: 0,
  timerIntervalId: 0,
  showModal: false,
  transitionTimerType: POMODORO,
};

const Main: React.FC = () => {
  const dispatch = useAppDispatch();
  const timerConfiguration = useAppSelector(selectTimerConfiguration);
  const clickAudio = new Audio(audioClick);
  const endTimerAudio = new Audio(endTimerAlarm);
  const [state, setState] = useState<IMainState>({
    ...defaultState,
    timerSeconds: timerConfiguration[defaultState.timerType],
  });

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
  }, [state.timerType, timerConfiguration]);

  const updateTimerType = (timerType: string) => {
    setState({
      ...state,
      isTimerRunning: false,
      timerSeconds: timerConfiguration[timerType],
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
        timeElapsed: 0,
      });
    } else {
      setState({
        ...state, timerType,
        timeElapsed: 0,
      });

      dispatch(
        setTimerType({
          timerType
        })
      )

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
      timeElapsed: 0,
    });

    dispatch(
      setTimerType({
        timerType: state.transitionTimerType,
      })
    )
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
  console.log(state.timeElapsed)
  const width = state.timeElapsed > 0
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
    <main>
      {state.showModal ? (
        <Modal renderContent={!!state.timerType} onCancel={onCancel}>
          <ChangeTimerModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            className={state.timerType}
          />
        </Modal>
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
            className={classNames(classes["btn"], {
              [classes["btn--active"]]: state.timerType === POMODORO,
            })}
            disabled={false}
            onClickHandler={() => handleTimerType(POMODORO)}
          >
            Pomodoro
          </Button>
          <Button
            className={classNames(
              {
                [classes["btn--active"]]: state.timerType === SHORT_BREAK,
              },
              classes["btn"]
            )}
            disabled={false}
            onClickHandler={() => handleTimerType(SHORT_BREAK)}
          >
            Short Break
          </Button>
          <Button
            className={classNames(
              {
                [classes["btn--active"]]: state.timerType === LONG_BREAK,
              },
              classes["btn"]
            )}
            disabled={false}
            onClickHandler={() => handleTimerType(LONG_BREAK)}
          >
            Long Break
          </Button>
        </div>
        <Timer timer={`${minutes}:${seconds}`} />
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
