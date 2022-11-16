import React from "react";
import styles from './Button.module.scss';

type ButtonProps = {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    variant: string;
    isActive?: boolean;
    className?: string;
};

export default class Button extends React.Component<ButtonProps, {}> {
    state = {
        className: {
            action: "action-button",
            default: "default",
        }
    }
    
    render() {
        const { className } = this.state;
        const { variant, isActive, disabled, onClick, children } = this.props;
        const activeClassName = isActive ? styles["button-active"] : "";
        
        console.log(this.props.isActive);
        return (
            <button
                className={`${styles[className[variant]]} ${activeClassName} ${this.props.className}`}
                disabled={disabled}
                onClick={onClick}
            >
                {children}
            </button>
        );
    }
}
