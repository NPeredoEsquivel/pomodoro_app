import React from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import TaskList from './TaskList/TaskList';
import classes from './Main.module.scss';
//import tasks from '../../assets/data/tasks.js';
interface IMainProps {
  handleBackgroundColor: (backgroundColorToSet: string) => void
};
interface IMainState {
  timerType: string,
  resetTimer: boolean,
  isTimerRunning: boolean,
  timerSeconds: number,
  timerIntervalId: number,
}

export default class Main extends React.Component<IMainProps, IMainState> {
  state = {
    timerType: "pomodoro",
    resetTimer: false,
    isTimerRunning: false,
    timerSeconds: 3600,
    timerIntervalId: 0,
  }

  constructor(props: IMainProps) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.handleStartTimer = this.handleStartTimer.bind(this);
    this.handlePauseTimer = this.handlePauseTimer.bind(this);
    this.changeTimerType = this.changeTimerType.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.timerIntervalId);
  }

  updateState(newState){
    this.setState({ ...this.state, ...newState })
  }
  
  handleStartTimer(){
    const timerIntervalId = setInterval(() => this.setState((prevState) => {
      return {
        ...prevState,
        timerSeconds: prevState.timerSeconds - 1,
      }
    }), 1000);

    this.updateState({ timerIntervalId, isTimerRunning: true });
  }

  handlePauseTimer(){
    clearInterval(this.state.timerIntervalId);
    this.updateState({ isTimerRunning: false });
  }

  changeTimerType = (timerType: string) => {
    this.updateState({ timerType });
    this.props.handleBackgroundColor(timerType); // aquí el setState y el callback se pueden unir.
  }

  render() {
    const {
      isTimerRunning = false,
      timerType,
      timerSeconds = 0,
    } = this.state


    const minutesText = parseInt((timerSeconds / 60).toString());
    const secondsText = (timerSeconds % 60).toString().length === 1 ? `0${timerSeconds % 60}` : timerSeconds % 60;

    return (
      <main>
        <div className={classes.division} />
        <Card>
          <div className={classes['buttons-container']}>
            <Button
              isActive={timerType === "pomodoro"}
              variant="action"
              disabled={isTimerRunning}
              onClick={() => this.changeTimerType("pomodoro")}
            >
              Pomodoro
            </Button>
            <Button
              isActive={timerType === "shortbreak"}
              variant="action"
              disabled={isTimerRunning}
              onClick={() => this.changeTimerType("shortbreak")}
            >
              Short Break
            </Button>
            <Button
              isActive={timerType === "longbreak"}
              variant="action"
              disabled={isTimerRunning}
              onClick={() => this.changeTimerType("longbreak")}
            >
              Long Break
            </Button>
          </div>
          <div className={classes['time-container']}>
            {`${minutesText}:${secondsText}`}
          </div>
          <div className={classes['action-container']}>
            <Button
              variant="default"
              className={`${classes[timerType]}`}
              disabled={false}
              onClick={isTimerRunning ? this.handlePauseTimer : this.handleStartTimer}
            >
              {isTimerRunning ? "PAUSE" : "START"}
            </Button>
          </div>
        </Card>
        <TaskList />
      </main>
    )
  }
}