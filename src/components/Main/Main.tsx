import React from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import TaskList from './TaskList/TaskList';
import classes from './Main.module.scss';

type MyProps = {};

type MyState = {
  timerType: string;
  resetTimer: boolean;
  isTimerRunning: boolean;
  start: number;
  timer: number;
  interval?: number;
};

export default class Main extends React.Component<MyProps, MyState> {
  constructor(props: MyProps){
    super(props)

    this.state = {
      timerType: "Pomodoro",
      resetTimer: false,
      isTimerRunning: false,
      start: 2700,
      timer: 2700,
    }
  }

  componentDidMount() {
    console.log("I Mounted")
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
   
  }

  render() {
    const {
      timer,
      isTimerRunning,
    } = this.state;

    const minutes = parseInt((timer / 60).toString());
    const seconds = (timer % 60).toString().length === 1 ? `0${timer % 60}` : timer % 60;
    
    return (
        <main>
          <div className={classes.division}/>
          <Card>
              <div className={classes['buttons-container']}>
                  <Button
                      classProps={`${classes.active} ${classes['action-button']}`}
                      disableButton={isTimerRunning}
                      onClickHandler={() =>
                          this.handleTimerType("pomodoro")
                      }
                  >
                      Pomodoro
                  </Button>
                  <Button
                      classProps={`${classes['action-button']}`}
                      disableButton={isTimerRunning}
                      onClickHandler={() =>
                          this.handleTimerType("shortbreak")
                      }
                  >
                      Short Break
                  </Button>
                  <Button
                      classProps={`${classes['action-button']}`}
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
                    classProps={classes['action-btn']}
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
