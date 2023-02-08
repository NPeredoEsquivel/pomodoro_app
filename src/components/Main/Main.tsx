import React from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import TaskList from "./TaskList/TaskList";
import classes from "./Main.module.scss";
import Modal from "src/UI/Modal/Modal";
//import tasks from '../../assets/data/tasks.js';

interface IMainProps {
    handleBackgroundColor: (backgroundColorToSet: string) => void;
}

interface IMainState {
    timerType: string;
    resetTimer: boolean;
    isTimerRunning: boolean;
    timerSeconds: number;
    timerIntervalId: number;
    showModal: boolean;
    transitionTimerType: string;
}

class Main extends React.Component<IMainProps, IMainState> {
    constructor(props: IMainProps) {
        super(props);

        this.state = {
            timerType: "pomodoro",
            resetTimer: false,
            isTimerRunning: false,
            timerSeconds: 2700,
            timerIntervalId: 0,
            showModal: false,
            transitionTimerType: "pomodoro",
        };

        this.handleStartTimer = this.handleStartTimer.bind(this);
        this.handlePauseTimer = this.handlePauseTimer.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentDidMount() {
        //document.body.style.backgroundColor = "rgb(217, 85, 80)";
    }

    componentWillUnmount() {
        clearInterval(this.state.timerIntervalId);
    }

    componentDidUpdate(prevProps: any, prevState: any) {
        if (
            prevProps.timerSeconds !== 0 &&
            this.state.timerSeconds === 0 &&
            this.state.isTimerRunning
        ) {
            clearInterval(this.state.timerIntervalId);
            this.updateState({
                isTimerRunning: false,
            });
        }

        if (prevState.timerType !== this.state.timerType) {
            switch (this.state.timerType) {
                case "pomodoro":
                    this.updateState({
                        resetTimer: true,
                        isTimerRunning: false,
                        timerSeconds: 3600,
                    });
                    break;
                case "shortbreak":
                    this.updateState({
                        resetTimer: true,
                        isTimerRunning: false,
                        timerSeconds: 300,
                    });
                    break;
                case "longbreak":
                    this.updateState({
                        resetTimer: true,
                        isTimerRunning: false,
                        timerSeconds: 900,
                    });
                    break;
                default:
                    break;
            }
        }
    }

    updateState(newState) {
        this.setState({ ...this.state, ...newState });
    }

    handleStartTimer(isInModal = false) {
        const interval = window.setInterval(
            () =>
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        timerSeconds: prevState.timerSeconds - 1,
                    };
                }),
            1000
        );

        this.updateState({
            timerIntervalId: interval,
            isTimerRunning: true,
        });
    }

    handlePauseTimer() {
        if (this.state.timerIntervalId) {
            this.updateState({
                isTimerRunning: false,
            });
            clearInterval(this.state.timerIntervalId);
        }
    }

    handleTimerType(timerType: string) {
        if (this.state.isTimerRunning) {
            this.updateState({
                showModal: true,
                transitionTimerType: timerType,
                isTimerRunning: false,
            });

            if (this.state.timerIntervalId) {
                clearInterval(this.state.timerIntervalId);
            }
        } else {
            this.updateState({ timerType });
            this.props.handleBackgroundColor(timerType);
            if (this.state.timerIntervalId) {
                clearInterval(this.state.timerIntervalId);
            }
        }
    }

    onConfirm() {
        this.updateState({
            showModal: false,
            timerType: this.state.transitionTimerType,
        });

        this.props.handleBackgroundColor(this.state.transitionTimerType);
    }

    onCancel() {
        this.updateState({
            showModal: false,
        });
    }

    render() {
        const { isTimerRunning, timerType, showModal } = this.state;

        const { timerSeconds } = this.state;

        const minutes = parseInt((timerSeconds / 60).toString());
        const seconds =
            (timerSeconds % 60).toString().length === 1
                ? `0${timerSeconds % 60}`
                : timerSeconds % 60;

        console.log(`${minutes}:${seconds}`);
        return (
            <main>
                {showModal ? (
                    <Modal
                        title="Title modal"
                        body="simple body"
                        onConfirm={() => this.onConfirm()}
                        onCancel={() => this.onCancel()}
                    ></Modal>
                ) : null}
                <div className={classes.division} />
                <Card className="">
                    <div className={classes["buttons-container"]}>
                        <Button
                            classProps={`${
                                timerType === "pomodoro" ? classes.active : ""
                            } ${classes["action-button"]}`}
                            disableButton={false}
                            onClickHandler={() =>
                                this.handleTimerType("pomodoro")
                            }
                        >
                            Pomodoro
                        </Button>
                        <Button
                            classProps={`${
                                timerType === "shortbreak" ? classes.active : ""
                            } ${classes["action-button"]}`}
                            disableButton={false}
                            onClickHandler={() =>
                                this.handleTimerType("shortbreak")
                            }
                        >
                            Short Break
                        </Button>
                        <Button
                            classProps={`${
                                timerType === "longbreak" ? classes.active : ""
                            } ${classes["action-button"]}`}
                            disableButton={false}
                            onClickHandler={() =>
                                this.handleTimerType("longbreak")
                            }
                        >
                            Long Break
                        </Button>
                    </div>
                    <div className={classes["time-container"]}>
                        {`${minutes}:${seconds}`}
                    </div>
                    <div className={classes["action-container"]}>
                        <Button
                            classProps={`${classes["action-btn"]} ${classes[timerType]}`}
                            disableButton={false}
                            onClickHandler={
                                isTimerRunning
                                    ? this.handlePauseTimer
                                    : this.handleStartTimer
                            }
                        >
                            {isTimerRunning ? "PAUSE" : "START"}
                        </Button>
                    </div>
                </Card>
                <TaskList />
            </main>
        );
    }
}

export default Main;
