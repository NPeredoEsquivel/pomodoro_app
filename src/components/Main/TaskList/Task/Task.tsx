import React from "react";
import classes from "./Task.module.scss";
import ThreeDotsTask from "../../../../assets/img/vertical-ellipsis.png";
import { Task as TaskElement } from "src/store/slices/tasksSlice";

type MyProps = {
  task: TaskElement;
  handleActivateTask: (params: number) => void;
  taskIndex: number;
  activeTask: number | null;
};

type MyState = {};

const Task: React.FC<MyProps> = ({
  task,
  handleActivateTask,
  activeTask,
  taskIndex,
}) => {
  return (
    <div
      className={`${classes.task} ${task.active ? classes["is-active"] : ""}`}
      onClick={() => handleActivateTask(taskIndex)}
    >
      <div className={classes["task-information"]}>
        <div className={classes["complete-task"]}></div>
        <span>{task.name}</span>
      </div>
      {/* Future improvement when adding actions to tasks */}
      {/* <div className={classes["actions"]}>
        <span>0/1</span>
        <div className={classes["task-button"]}>
          <img
            className={classes["button-img"]}
            src={ThreeDotsTask}
            alt="three-dots"
          />
        </div>
      </div> */}
    </div>
  );
};
export default Task;
