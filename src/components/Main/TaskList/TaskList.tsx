import React, { useState } from "react";
import Task from "./Task/Task";
import TaskForm from "./TaskForm/TaskForm";
import ThreeDots from "../../../assets/img/threedots-white.png";
import classes from "./TaskList.module.scss";

const tasks = [
  {
    name: "task-1",
  },
  {
    name: "task-2",
  },
  {
    name: "task-3",
  },
  {
    name: "task-4",
  },
  {
    name: "task-5",
  },
];

const TaskList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleActiveTask = (taskIndex: number) => {
    setActiveIndex(taskIndex);
  };

  return (
    <div className={classes["task-list-container"]}>
      <div className={classes["current-task"]}>#1</div>
      <p>Time to focus!</p>
      <div className={classes["task-list"]}>
        <div className={classes["task-list-header"]}>
          <div className={classes.title}>Tasks</div>
          <div className={classes.actions}>
            <button className={classes["task-list-header-button"]}>
              <img
                className={classes["header-buton-img"]}
                src={ThreeDots}
                alt="three-dots"
              />
            </button>
          </div>
        </div>
        <div className={classes["task-list-body"]}>
          {tasks.map((currentTask, index) => {
            return (
              <Task
                key={index}
                name={currentTask.name}
                taskIndex={index}
                handleActivateTask={handleActiveTask}
                activeTask={activeIndex}
              />
            );
          })}
        </div>
        <div className={classes["task-form-container"]}>
          <TaskForm />
        </div>
      </div>
    </div>
  );
};

export default TaskList;
