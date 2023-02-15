import React from "react";
import classes from "./TaskForm.module.scss";
import AddTask from "../../../../assets/img/plus-circle-white.png";
import CaretUp from "../../../../assets/img/caret-up.png";
import CaretDown from "../../../../assets/img/caret-down.png";

type MyProps = {};

type MyStates = {
    openModal: boolean;
};
export default class TaskForm extends React.PureComponent<MyProps, MyStates> {
    private modalRef: React.RefObject<HTMLInputElement>;
    constructor(props: MyProps) {
        super(props);

        this.state = {
            openModal: false,
        };

        this.modalRef = React.createRef();
    }

    handleOpenModal() {
        this.setState((prevState) => ({
            openModal: !prevState.openModal,
        }));
    }

    handleCancelAction() {
        this.setState((prevState) => ({
            openModal: !prevState.openModal,
        }));
    }

    componentDidUpdate(prevPops: MyProps, prevState: MyStates) {
        if (this.state.openModal) {
            if (prevState.openModal !== this.state.openModal) {
                this.modalRef.current?.scrollIntoView({ behavior: "smooth" });
            }
        }
    }

    render() {
        return (
            <div>
                <div
                    className={`${classes["task-form-action"]} ${
                        !this.state.openModal ? "" : classes["display-none"]
                    }`}
                    onClick={() => this.handleOpenModal()}
                >
                    <img src={AddTask} alt="add-task" />
                    <div className={classes["action"]}>Add Task</div>
                </div>
                <div
                    className={`${classes["task-form"]} ${
                        this.state.openModal ? "" : classes["display-none"]
                    }`}
                    ref={this.modalRef}
                >
                    <div className={classes["task-form-body"]}>
                        <div className={classes["task-title-input"]}>
                            <input
                                className={classes["task-title"]}
                                type="text"
                                placeholder="Whare are you working on?"
                            />
                        </div>
                        <div className={classes["est-pomodoro"]}>
                            <div className={classes["est-pomodoro-title"]}>
                                Est Pomodoros
                            </div>
                            <div className={classes["est-pomodoro-action"]}>
                                <input
                                    className={classes["est-pomodoro-input"]}
                                    type="number"
                                    placeholder="1"
                                />
                                <button>
                                    <img src={CaretUp} alt="" />
                                </button>
                                <button>
                                    <img src={CaretDown} alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={classes["task-form-footer"]}>
                        <div>
                            <button className={classes["delete-button"]}>
                                Delete
                            </button>
                        </div>
                        <div>
                            <button
                                className={classes["cancel-button"]}
                                onClick={() => this.handleCancelAction()}
                            >
                                Cancel
                            </button>
                            <button className={classes["save-button"]}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
