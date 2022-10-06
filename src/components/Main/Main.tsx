import React from 'react';
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import TaskList from './TaskList/TaskList';
import classes from './Main.module.scss';
//import tasks from '../../assets/data/tasks.js';
import { connect } from 'react-redux';
import { TimerState } from '../../state/reducers/types/reducerTypes';
import { Dispatch } from 'redux';
import { updateTimer } from '../../state/action-creators';
import { Action } from '../../state/actions';

interface MyProps {
  handleBackgroundColor: (backgroundColorToSet: string) => void;
}
interface ConnectedProps {
  timer: TimerState
}  
interface DispatchProps {  
  updateTimer: (timer: TimerState) => (dispatch: Dispatch<Action>) => void
}

type MyState = {
  timerSeconds: number;
};

type Props = MyProps & ConnectedProps & DispatchProps;

class Main extends React.PureComponent<Props, MyState> {
  constructor(props: Props){
    super(props)

    console.log("props", this.props)
    this.state = {
      timerSeconds: this.props.timer.timerSeconds,
    }
  }

  componentDidMount() {
    //document.body.style.backgroundColor = "rgb(217, 85, 80)";
  }

  componentWillUnmount(){
    clearInterval(this.props.timer.interval)
  }

  componentDidUpdate() {
    if(this.state.timerSeconds === 0) {
      clearInterval(this.props.timer.interval)
      this.props.updateTimer(
        {
          ...this.props.timer,
          isTimerRunning: false,
        }
      )
      /* this.setState({
        isTimerRunning: false,
      }) */
    }
  }

  handleStartTimer = () => {    
    const interval = window.setInterval(() => this.setState((prevState) => {
      return {
        ...prevState,
        timerSeconds: prevState.timerSeconds - 1,
      }
    }), 1000);

    this.props.updateTimer(
      {
        ...this.props.timer,
        interval,
        isTimerRunning: false,
      }
    )

    /* this.setState(prevState => {
       return {
         ...prevState,
         interval,
         isTimerRunning: true,
       }
     }) */
  }

  handleStopTimer = () => {
    if (this.props.timer.interval) {

    this.props.updateTimer(
      {
        ...this.props.timer,
        isTimerRunning: false,
      }
    )
      /* this.setState((prevState) => {
        return {
          ...prevState,
          isTimerRunning: false,
        }
      }) */
      clearInterval(this.props.timer.interval)
    }
  }

  handleTimerType = (timerType: string) => {
    /* this.setState({
      timerType,
    }) */

    this.props.updateTimer(
      {
        ...this.props.timer,
        timerType,
      }
    )
    /* this.props.dispatch({
      type: 'CHANGE_TIMER_TYPE',
      payload: {
        timerType,
      }
    }) */
    this.props.handleBackgroundColor(timerType)
  }

  render() {
    const {
      isTimerRunning,
      timerType,
    } = this.props.timer;

    const {timerSeconds} = this.state;

    const minutes = parseInt((timerSeconds / 60).toString());
    const seconds = (timerSeconds % 60).toString().length === 1 ? `0${timerSeconds % 60}` : timerSeconds % 60;
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


const mapStateToProps = (state: ConnectedProps) => {
  console.log("state", state)
  return state;
}

const mapDispatchToProps = {
  updateTimer,
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

