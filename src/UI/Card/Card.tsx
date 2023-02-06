import React from "react";
import classes from "./Card.module.scss";

type CardProps = {
    className: string;
    children: React.ReactNode;
};

export default class Card extends React.Component<CardProps, {}> {
    constructor(props: CardProps) {
        super(props);
    }
    render() {
        return (
            <div className={`${classes.container} ${this.props.className}}`}>
                {this.props.children}
            </div>
        );
    }
}
