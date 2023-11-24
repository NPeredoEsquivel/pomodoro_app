import React, { useRef } from "react";
import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import classes from "./ConfigurationModal.module.scss";
import FormInput from "../../UI/FormInput/FormInput";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  selectTimerConfiguration,
  setTimerConfiguration,
} from "../../store/slices/timerConfigSlice";

interface ConfigurationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  className: string;
}

const ConfigurationModal: React.FC<ConfigurationModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const timerConfiguration = useAppSelector(selectTimerConfiguration);
  const pomodoroTimer = useRef<HTMLInputElement>(null);
  const shortBreakTime = useRef<HTMLInputElement>(null);
  const longBreakTime = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pomodoroTimerValue = pomodoroTimer.current?.value;
    const shortBreakTimerValue = shortBreakTime.current?.value;
    const longBreakTimerValue = longBreakTime.current?.value;

    const formattedPomodoroTimerValue = pomodoroTimerValue
      ? +pomodoroTimerValue * 60
      : 0;
    const formattedShortBreakTimerValue = shortBreakTimerValue
      ? +shortBreakTimerValue * 60
      : 0;
    const formattedLongBreakTimerValue = longBreakTimerValue
      ? +longBreakTimerValue * 60
      : 0;
    dispatch(
      setTimerConfiguration({
        pomodoroTime: formattedPomodoroTimerValue,
        shortBreakTime: formattedShortBreakTimerValue,
        longBreakTime: formattedLongBreakTimerValue,
      })
    );
    props.onConfirm();
    return;
  };

  return (
    <Card className={`${props.className ? classes[props.className] : ""}`}>
      <div className={classes["header"]}>Setting</div>
      <form
        onSubmit={onSubmitHandler}
        className={classes["timer-settings-form"]}
      >
        <div className={classes["timer-settings-container"]}>
          <div className={classes["timer-setting"]}>
            <FormInput
              ref={pomodoroTimer}
              htmlFor="pomodoroSetting"
              label="Pomodoro"
              inputAttr={{
                type: "number",
                name: "pomodoroTimer",
                defaultValue: timerConfiguration.pomodoro / 60,
              }}
            />
          </div>
          <div className={classes["timer-setting"]}>
            <FormInput
              ref={shortBreakTime}
              htmlFor="shortBreakSetting"
              label="Short Break"
              inputAttr={{
                type: "number",
                name: "shortBreakTime",
                defaultValue: timerConfiguration.shortbreak / 60,
              }}
            />
          </div>
          <div className={classes["timer-setting"]}>
            <FormInput
              ref={longBreakTime}
              htmlFor="longBreakSetting"
              label="Long Break"
              inputAttr={{
                type: "number",
                name: "longBreakName",
                defaultValue: timerConfiguration.longbreak / 60,
              }}
            />
          </div>
        </div>
        {/* TODO: search how can i pass a default handler */}
        <div className={classes["action-buttons"]}>
          <Button
            className={classes["action-buttons__cancel"]}
            disabled={false}
            onClickHandler={props.onCancel}
            type="button"
            >
            Cancel
          </Button>
          <Button
            className={classes["action-buttons__submit"]}
            disabled={false}
            type="submit"
            >
            OK
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ConfigurationModal;
