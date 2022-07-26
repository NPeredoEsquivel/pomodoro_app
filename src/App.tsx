import './App.css';
import React from 'react';
import Header from './components/Header/Header';
import Button from './UI/Button/Button';
import Card from './UI/Card/Card';

type MyProps = {};

type MyStates = {
  timerType: string;
  resetTimer: boolean;
  isTimerRunning: boolean;
  start: number;
  timer: number;
  interval?: number;
};

export default class App extends React.PureComponent<MyProps, MyStates>{
  constructor(props: MyProps){
    super(props);

    //Timer in seconds (the default is 45 minutes).
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

  handleTimer = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval)
      this.setState({
        timer: this.state.start,
        isTimerRunning: false,
        interval: 0,
      })
      return;
    }

    this.setState(prevState => {
      return {
        ...prevState,
        isTimerRunning: true,
      }
    })

    const interval = window.setInterval(() => this.setState((prevState) => {
      return {
        ...prevState,
        timer: prevState.timer - 1,
      }
    }), 1000);
    console.log("this runs")
    this.setState({
      interval,
    });
  }

  handleTimerType = (timerType: string) => {    
    this.setState({
      timerType,
    })
   
  }

  render(){
    console.log("rendered")
    const {
      timer,
      interval,
      isTimerRunning,
    } = this.state;

    const minutes = parseInt((timer / 60).toString());
    const seconds = (timer % 60).toString().length === 1 ? `0${timer % 60}` : timer % 60;
    return(
      <>
      <Header/>
      <main>
        <div>
          <div>
            <Button 
              disableButton={isTimerRunning}
              onClickHandler={() => this.handleTimerType("pomodoro")}
            >
              Pomodoro
            </Button>
            <Button 
              disableButton={isTimerRunning}
              onClickHandler={() => this.handleTimerType("shortbreak")}
            >
              Short Break
            </Button>
            <Button 
              disableButton={isTimerRunning}
              onClickHandler={() => this.handleTimerType("longbreak")}
            >
              Long Break
            </Button>
          </div>
          <p>This is a Pomodoro App, the initial count is: {`${minutes}:${seconds}`}</p>
          <button onClick={this.handleTimer}>{interval ? "Stop timer" : "Start timer"}</button>
        
        </div>
      </main>
      <footer></footer>
      </>
    );
  }
}
