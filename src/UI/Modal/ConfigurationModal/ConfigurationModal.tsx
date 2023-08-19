import React, { useState } from "react";
import Card from "src/UI/Card/Card";
import Button from "src/UI/Button/Button";
import classes from "./ConfigurationModal.module.scss";

interface ConfigurationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  className: string;
}

const ConfigurationModal: React.FC<ConfigurationModalProps> = (props) => {
  const [pomodoroTime, setPomodoroTime] = useState<number>(0);
  const [shortBreakTime, setShortBreakTime] = useState<number>(0);
  const [longBreakTime, setLongBreakTime] = useState<number>(0);

  const onPomodoroTimeChange = (e) => {
    setPomodoroTime(e.target.value);
  };
  const onShortBreakTimeChange = (e) => {
    setShortBreakTime(e.target.value);
  };
  const onLongBreakTimeChange = (e) => {
    setLongBreakTime(e.target.value);
  };

  return (
    <Card className={`${props.className ? classes[props.className] : ""}`}>
      <header className={classes.modal__title}>Setting</header>
      <div className={classes["sub-title"]}>Time (minutes)</div>
      <div className={classes["timer-settings-container"]}>
        <div className="pomodoro-setting">
          <label htmlFor="pomodoroSetting"></label>
          <input
            type="number"
            value={pomodoroTime}
            onChange={onPomodoroTimeChange}
            name="pomodoroTime"
          />
        </div>
        <div className="short-break-setting">
          <label htmlFor="shortBreakSetting"></label>
          <input
            type="number"
            value={shortBreakTime}
            onChange={onShortBreakTimeChange}
            name="shortBreakTime"
          />
        </div>
        <div className="long-break-setting">
          <label htmlFor="longBreakSetting"></label>
          <input
            type="number"
            value={longBreakTime}
            onChange={onLongBreakTimeChange}
            name="longBreakName"
          />
        </div>
      </div>
      <footer className={classes.modal__footer}>
        <Button
          className={classes.modal__footer__button}
          disabled={false}
          onClickHandler={props.onConfirm}
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
      </footer>
    </Card>
  );
};

export default ConfigurationModal;
