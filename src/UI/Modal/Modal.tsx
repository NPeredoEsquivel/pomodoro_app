import React from "react";
import ReactDom from "react-dom";
import Card from "../Card/Card";
import Button from "../Button/Button";
import classes from "./Modal.module.scss";

type ModalProps = {
    title: string;
    body: string;
    onConfirm: () => void;
    onCancel: () => void;
};

const Backdrop = (props) => {
    return <div onClick={props.onCancel} className={classes.backdrop}></div>;
};

const ModalOverlay = (props: ModalProps) => {
    return (
        <Card className={classes.modal}>
            <header className={classes.text}>{props.title}</header>
            <div>{props.body}</div>
            <footer>
                Footer with buttons
                <Button
                    classProps="test"
                    disableButton={false}
                    onClickHandler={props.onConfirm}
                >
                    Ok
                </Button>
                <Button
                    classProps="test"
                    disableButton={false}
                    onClickHandler={props.onCancel}
                >
                    Cancel
                </Button>
            </footer>
        </Card>
    );
};

export default function Modal(props: ModalProps) {
    const portalBackdrop = document.getElementById("backdrop-root");
    const modalOverlay = document.getElementById("overlay-root");

    const el1: HTMLElement = portalBackdrop as HTMLElement;
    const el2: HTMLElement = modalOverlay as HTMLElement;
    return (
        <>
            {ReactDom.createPortal(<Backdrop onCancel={props.onCancel} />, el1)}
            {ReactDom.createPortal(
                <ModalOverlay
                    title={props.title}
                    body={props.body}
                    onConfirm={props.onConfirm}
                    onCancel={props.onCancel}
                />,
                el2
            )}
        </>
    );
}
