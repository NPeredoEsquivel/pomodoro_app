import React, { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import classes from "./App.module.scss";
//import { TimerState } from "./state/reducers/types/reducerTypes";
//import { connect } from "react-redux";

/* type MyProps = {};

type MyStates = {
    backgroundColorClass: string;
};

type BackgroundConst = {
    [key: string]: { color: string };
};

const BACKGROUND_COLORS: BackgroundConst = {
    pomodoro: {
        color: "rgb(217, 85, 80)",
    },
    shortbreak: {
        color: "rgb(76, 145, 149)",
    },
    longbreak: {
        color: "rgb(69, 124, 163)",
    },
}; */

const App: React.FC = () => {
  const [backgroundColorClass, setBackgroundColorClass] =
    useState<string>("pomodoro");
  const handleContainerBgClass = (backgroundColorToSet: string) => {
    setBackgroundColorClass(backgroundColorToSet);
  };
  return (
    <div className={`${classes.container} ${classes[backgroundColorClass]}`}>
      <Header />
      <Main handleBackgroundColor={handleContainerBgClass} />
      <footer></footer>
    </div>
  );
};

export default App;
/* class App extends React.PureComponent<MyProps, MyStates> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            backgroundColorClass: "pomodoro",
        };
    }
    handleContainerBgClass = (backgroundColorToSet: string) => {
        this.setState({
            backgroundColorClass: backgroundColorToSet,
        });
    };
    render() {
        return (
            <div
                className={`${classes.container} ${
                    classes[this.state.backgroundColorClass]
                }`}
            >
                <Header />
                <Main handleBackgroundColor={this.handleContainerBgClass} />
                <footer></footer>
            </div>
        );
    }
} */
/* 
const mapStateToProps = (state: TimerState) => {
    return state;
};

export default connect(mapStateToProps)(App); */
