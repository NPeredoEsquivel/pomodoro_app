import React from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import TaskList from './TaskList/TaskList';
import classes from './Main.module.scss';
import tasks from '../../assets/data/tasks.js';

type MyProps = {
  handleBackgroundColor: (backgroundColorToSet: string) => void
};

type MyState = {
  timerType: string;
  resetTimer: boolean;
  isTimerRunning: boolean;
  start: number;
  timer: number;
  interval?: number;
};



const TaskContext = React.createContext(tasks);
export default class Main extends React.PureComponent<MyProps, MyState> {
  constructor(props: MyProps){
    super(props)

    this.state = {
      timerType: "pomodoro",
      resetTimer: false,
      isTimerRunning: false,
      start: 2700,
      timer: 2700,
    }
  }

  componentDidMount() {
    //document.body.style.backgroundColor = "rgb(217, 85, 80)";
  }

  componentWillUnmount(){
    clearInterval(this.state.interval)
  }

  componentDidUpdate() {
    if(this.state.timer === 0) {
      clearInterval(this.state.interval)
      this.setState({
        isTimerRunning: false,
      })
    }
    
    let timerType = this.state.timerType
    document.body.classList.add("lol")
    //BACKGROUND_COLORS[timerType].color;

  }

  handleStartTimer = () => {    
    const interval = window.setInterval(() => this.setState((prevState) => {
      return {
        ...prevState,
        timer: prevState.timer - 1,
      }
    }), 1000);

    this.setState(prevState => {
       return {
         ...prevState,
         interval,
         isTimerRunning: true,
       }
     })
  }

  handleStopTimer = () => {
    if (this.state.interval) {
      this.setState((prevState) => {
        return {
          ...prevState,
          isTimerRunning: false,
        }
      })
      clearInterval(this.state.interval)
    }
  }

  handleTimerType = (timerType: string) => {
    this.setState({
      timerType,
    })
    this.props.handleBackgroundColor(timerType)
  }

  render() {
    const {
      timer,
      isTimerRunning,
      timerType,
    } = this.state;

    const minutes = parseInt((timer / 60).toString());
    const seconds = (timer % 60).toString().length === 1 ? `0${timer % 60}` : timer % 60;
    console.log("timertype", timerType)
    return (
        <main>
          <div className={classes.division}/>
          <Card>
              <div className={classes['buttons-container']}>
                  <Button
                      classProps={`${timerType === 'pomodoro' ? classes.active : ''} ${classes['action-button']}`}
                      disableButton={isTimerRunning}
                      onClickHandler={() =>
                          this.handleTimerType("pomodoro")
                      }
                  >
                      Pomodoro
                  </Button>
                  <Button
                      classProps={`${timerType === 'shortbreak' ? classes.active : ''} ${classes['action-button']}`}
                      disableButton={isTimerRunning}
                      onClickHandler={() =>
                          this.handleTimerType("shortbreak")
                      }
                  >
                      Short Break
                  </Button>
                  <Button
                      classProps={`${timerType === 'longbreak' ? classes.active : ''} ${classes['action-button']}`}
                      disableButton={isTimerRunning}
                      onClickHandler={() =>
                          this.handleTimerType("longbreak")
                      }
                  >
                      Long Break
                  </Button>
              </div>
              <div className={classes['time-container']}>
                    {`${minutes}:${seconds}`}
              </div>
              <div className={classes['action-container']}>
                <Button
                    classProps={`${classes['action-btn']} ${classes[timerType]}`}
                    disableButton={false}
                    onClickHandler={isTimerRunning ? this.handleStopTimer : this.handleStartTimer }
                >
                    {isTimerRunning ? "STOP" : "START"}
                </Button>
              </div>
          </Card>
          <TaskList/>
        </main>
    )
  }
}
