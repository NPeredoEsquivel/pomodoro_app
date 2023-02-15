import React from "react";
import ReactDom from "react-dom";
import Card from "../Card/Card";
import Button from "../Button/Button";
import classes from "./Modal.module.scss";
import Spinner from "../Spinner/Spinner";

type ModalProps = {
    title: string;
    body: string;
    onConfirm: () => void;
    onCancel: () => void;
    timerType?: string;
};

const Backdrop = (props) => {
    return <div onClick={props.onCancel} className={classes.backdrop}></div>;
};

const ModalOverlay = (props: ModalProps) => {
    return (
        <>
            {props.timerType ? (
                <Card
                    className={`${classes.modal} ${classes[props.timerType]}`}
                >
                    <header className={classes.modal__title}>
                        {props.title}
                    </header>
                    <div className={classes.modal__body}>{props.body}</div>
                    <footer className={classes.modal__footer}>
                        <Button
                            classProps={classes.modal__footer__button}
                            disableButton={false}
                            onClickHandler={props.onConfirm}
                        >
                            Ok
                        </Button>
                        <Button
                            classProps={classes.modal__footer__button}
                            disableButton={false}
                            onClickHandler={props.onCancel}
                        >
                            Cancel
                        </Button>
                    </footer>
                </Card>
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default function Modal(props: ModalProps) {
    console.log(props);
    const portalBackdrop = document.getElementById("backdrop-root");
    const modalOverlay = document.getElementById("overlay-root");

    const portalBackdropElement: HTMLElement = portalBackdrop as HTMLElement;
    const modalOverlayElement: HTMLElement = modalOverlay as HTMLElement;
    return (
        <>
            {ReactDom.createPortal(
                <Backdrop onCancel={props.onCancel} />,
                portalBackdropElement
            )}
            {ReactDom.createPortal(
                <ModalOverlay
                    title={props.title}
                    body={props.body}
                    onConfirm={props.onConfirm}
                    onCancel={props.onCancel}
                    timerType={props.timerType}
                />,
                modalOverlayElement
            )}
        </>
    );
}
