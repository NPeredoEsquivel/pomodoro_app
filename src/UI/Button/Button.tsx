import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    onClickHandler: () => void;
    disableButton: boolean;
};

export default class Button extends React.Component<ButtonProps, {}> {
    constructor(props: ButtonProps) {
        super(props);
    }
    render() {
        return (
            <button
                disabled={this.props.disableButton}
                onClick={this.props.onClickHandler}
            >
                {this.props.children}
            </button>
        );
    }
}
