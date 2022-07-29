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

  render(){
    console.log("rendered")
    const {
      timer,
      isTimerRunning,
    } = this.state;

    const minutes = parseInt((timer / 60).toString());
    const seconds = (timer % 60).toString().length === 1 ? `0${timer % 60}` : timer % 60;
    return (
        <>
            <Header />
            <main>
                <Card>
                    <div>
                        <Button
                            disableButton={isTimerRunning}
                            onClickHandler={() =>
                                this.handleTimerType("pomodoro")
                            }
                        >
                            Pomodoro
                        </Button>
                        <Button
                            disableButton={isTimerRunning}
                            onClickHandler={() =>
                                this.handleTimerType("shortbreak")
                            }
                        >
                            Short Break
                        </Button>
                        <Button
                            disableButton={isTimerRunning}
                            onClickHandler={() =>
                                this.handleTimerType("longbreak")
                            }
                        >
                            Long Break
                        </Button>
                    </div>
                    <p>
                        This is a Pomodoro App, the initial count is:{" "}
                        {`${minutes}:${seconds}`}
                    </p>
                    <Button
                        disableButton={false}
                        onClickHandler={isTimerRunning ? this.handleStopTimer : this.handleStartTimer }
                    >
                        {isTimerRunning ? "Stop timer" : "Start timer"}
                    </Button>
                </Card>
            </main>
            <footer></footer>
        </>
    );
  }
}
