import React, { useRef } from "react";
import Card from "src/UI/Card/Card";
import Button from "src/UI/Button/Button";
import classes from "./ConfigurationModal.module.scss";
import FormInput from "src/UI/FormInput/FormInput";

interface ConfigurationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  className: string;
}

const ConfigurationModal: React.FC<ConfigurationModalProps> = (props) => {
  const pomodoroTimer = useRef<HTMLInputElement>(null);
  const shortBreakTime = useRef<HTMLInputElement>(null);
  const longBreakTime = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pomodoroTimerValue = pomodoroTimer.current?.value;
    const shortBreakTimerValue = shortBreakTime.current?.value;
    const longBreakTimerValue = longBreakTime.current?.value;

    const formattedPomodoroTimerValue =
      pomodoroTimerValue && +pomodoroTimerValue;
    const formattedShortBreakTimerValue =
      shortBreakTimerValue && +shortBreakTimerValue;
    const formattedLongBreakTimerValue =
      longBreakTimerValue && +longBreakTimerValue;

    props.onConfirm();
    return;
  };

  return (
    <Card className={`${props.className ? classes[props.className] : ""}`}>
      <header className={classes.modal__title}>Timmer settings</header>
      <form
        onSubmit={onSubmitHandler}
        className={classes["timer-settings-form"]}
      >
        <div className={classes["timer-settings-container"]}>
          <div className="pomodoro-setting">
            <FormInput
              ref={pomodoroTimer}
              htmlFor="pomodoroSetting"
              label="Pomodoro timmer"
              inputAttr={{
                type: "number",
                name: "pomodoroTimer",
                defaultValue: 45,
              }}
            />
          </div>
          <div className="short-break-setting">
            <FormInput
              ref={shortBreakTime}
              htmlFor="shortBreakSetting"
              label="Short break timmer"
              inputAttr={{
                type: "number",
                name: "shortBreakTime",
                defaultValue: 5,
              }}
            />
          </div>
          <div className="long-break-setting">
            <FormInput
              ref={longBreakTime}
              htmlFor="longBreakSetting"
              label="Long break timmer"
              inputAttr={{
                type: "number",
                name: "longBreakName",
                defaultValue: 15,
              }}
            />
          </div>
        </div>
        {/* TODO: search how can i pass a default handler */}
        <Button
          className={classes.modal__footer__button}
          disabled={false}
          onClickHandler={() => {}}
          type="submit"
        >
          Accept
        </Button>
        <Button
          className={classes.modal__footer__button}
          disabled={false}
          onClickHandler={props.onCancel}
        >
          Cancel
        </Button>
      </form>
    </Card>
  );
};

export default ConfigurationModal;
