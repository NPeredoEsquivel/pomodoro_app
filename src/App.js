import './App.css';
import React from 'react';
import Header from './components/Header/Header';

export default class App extends React.Component{
  constructor(props){
    super(props);

    //Timer in seconds (the default is 45 minutes).
    this.state = {
      timer: 2700,
      resetTimer: false,
      isOn: false,
      start: 2700,
    }
  }

  componentDidMount() {
    console.log("mounted")
  }

  componentWillUnmount(){
    clearInterval(this.state.interval)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state.timer === 0) {
      clearInterval(this.state.interval)
      this.setState({
        isOn: false,
      })
    }
    console.log("i updated")
  }

  handleTimer = () => {

    if (this.state.interval) {
      clearInterval(this.state.interval)
      this.setState({
        timer: this.state.start,
        isOn: false,
        interval: 0,
      })
      return;
    }

    const interval = setInterval(() => this.setState((prevState) => {
      return {
        ...prevState,
        timer: prevState.timer - 1,
        isOn: true,
      }
    }), 1000);
        
    this.setState({
      interval,
    });
  }

  handleChangeTimer = (e) => {
    this.setState({
      timer: e.target.value,
    })
  }

  render(){
    const {
      timer,
      interval,
    } = this.state;

    let minutes = parseInt(timer / 60);
    let seconds = (timer % 60).toString().length === 1 ? `0${timer % 60}` : timer % 60;
    return(
      <>
      <Header/>
      <main>
        <div className="App">
          <p>This is a Pomodoro App, the initial count is: {`${minutes}:${seconds}`}</p>
          <button onClick={this.handleTimer}>{interval ? "Stop timer" : "Start timer"}</button>
        
        </div>
      </main>
      <footer></footer>
      </>
    );
  }
}
