import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    timerTypeButton: string;
    onClickHandler: (arg0: string) => void;
    isTimerRunning: boolean;
};

export default class Button extends React.Component<ButtonProps, {}> {
    constructor(props: ButtonProps, children: React.ReactNode) {
        super(props);
    }
    render() {
        return (
            <button
                disabled={this.props.isTimerRunning}
                onClick={() =>
                    this.props.onClickHandler(this.props.timerTypeButton)
                }
            >
                {this.props.children}
            </button>
        );
    }
}
