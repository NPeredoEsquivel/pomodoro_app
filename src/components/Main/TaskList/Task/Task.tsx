import React from "react";
import classes from "./Task.module.scss";
import ThreeDotsTask from "../../../../assets/img/vertical-ellipsis.png";

type MyProps = {
  taskIndex: number;
  name: string;
  handleActivateTask: (params: number) => void;
  activeTask: number | null;
};

type MyState = {};

const Task: React.FC<MyProps> = ({
  taskIndex,
  name,
  handleActivateTask,
  activeTask,
}) => {
  return (
    <div
      className={`${classes.task} ${
        activeTask === taskIndex ? classes["is-active"] : ""
      }`}
      onClick={() => handleActivateTask(taskIndex)}
    >
      <div className={classes["task-information"]}>
        <div className={classes["complete-task"]}></div>
        <span>{name}</span>
      </div>
      <div className={classes["actions"]}>
        <span>0/1</span>
        <div className={classes["task-button"]}>
          <img
            className={classes["button-img"]}
            src={ThreeDotsTask}
            alt="three-dots"
          />
        </div>
      </div>
    </div>
  );
};
export default Task;
