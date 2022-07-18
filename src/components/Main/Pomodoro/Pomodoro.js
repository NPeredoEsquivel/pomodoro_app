import React from 'react'
import classes from './Pomodoro.module.scss';
export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);

    this.state({
      timer: 2700,
      startTime: 2700,
      isOn: false,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.timer === 0) {
      clearInterval(this.state.interval);
      this.setState({
        isOn: false,
      })
    }
  }

  handleTimer = () => {
    if (this.state.interval) {
      clearInterval(this.state.interval);
      this.setState({
        timer: this.state.timer,
        isOn: false,
        interval: 0,
      })
      return;
    }

    const interval = setInterval(() => this.setState((prevState) => {
      return {
        ...prevState,
        timer: this.state.timer - 1,
        isOn: true,
      }
    }), 1000);

    this.setState({
      interval,
    });
  }

  render() {
    const {
      timer,
      interval,
    } = this.state;

    const minutes = parseInt( timer / 60);
    const seconds = ( timer % 60 ).toString().length === 1 ? `0${timer % 60}` : timer % 60;
    return (
      <div>
        {`${minutes}:${seconds}`}
      </div>
    )
  }
}
