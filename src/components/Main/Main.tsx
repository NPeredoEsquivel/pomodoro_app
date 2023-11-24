import React, { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import TaskList from "../TaskList/TaskList";
import classes from "./Main.module.scss";
import Modal from "../../UI/Modal/Modal";
import audioClick from "../../assets/audio/click_audio.wav";
import ChangeTimerModal from "../ChangeTimerModal/ChangeTimerModal";
import endTimerAlarm from "../../assets/audio/clock_alarm.wav";
import Timer from "../Timer/Timer";
import { selectTimerConfiguration } from "../../store/slices/timerConfigSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setTimerType } from "../../store/slices/timerTypeSlice";
import DivisionBar from "../DivisionBar/DivisionBar";
import TimerTypeButtons from "../TimerTypeButtons/TimerTypeButtons";
import UpdateTimerButton from "../UpdateTimerButton/UpdateTimerButton";

const TIMER_CONFIG = {};
const POMODORO = "pomodoro";
const SHORT_BREAK = "shortbreak";
const LONG_BREAK = "longbreak";

TIMER_CONFIG[POMODORO] = 2700;
TIMER_CONFIG[SHORT_BREAK] = 300;
TIMER_CONFIG[LONG_BREAK] = 900;

Object.freeze(TIMER_CONFIG);
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
    setState({ ...state, timerSeconds: TIMER_CONFIG[timerType], timeElapsed: 0});
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

  return (
    <main>
      {state.showModal && (
        <Modal renderContent={!!state.timerType} onCancel={onCancel}>
          <ChangeTimerModal
            onConfirm={onConfirm}
            onCancel={onCancel}
            className={state.timerType}
          />
        </Modal>
      )}
      <DivisionBar      
        timeElapsed={state.timeElapsed}
        timerSeconds={state.timerSeconds}      
      /> 
      <Card className={classes["timer_container"]}>
        <TimerTypeButtons 
          timerType={state.timerType} 
          handleTimerType={handleTimerType}
        />
        <Timer timer={`${minutes}:${seconds}`} />
        <UpdateTimerButton 
          timerType={state.timerType}
          handlePauseTimer={handlePauseTimer}
          handleResetTimer={handleResetTimer}
          handleStartTimer={handleStartTimer}
          isTimerRunning={state.isTimerRunning}
          timerSeconds={state.timerSeconds}
        />
      </Card>
      <TaskList />
    </main>
  );
};

export default Main;
