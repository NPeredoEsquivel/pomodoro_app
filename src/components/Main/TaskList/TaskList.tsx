import React, { useState } from "react";
import Task from "./Task/Task";
import TaskForm from "./TaskForm/TaskForm";
import ThreeDots from "../../../assets/img/threedots-white.png";
import classes from "./TaskList.module.scss";
import { useAppSelector } from "src/store/hooks";
import { selectTasks } from "src/store/slices/tasksSlice";

type MyProps = {};

type MyState = {
  activeIndex: number | null;
};

const TaskList: React.FC = () => {
  const tasks = useAppSelector(selectTasks);
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleActiveTask = (taskIndex: number) => {
    setActiveIndex(taskIndex);
  };

  const orderedTasks = tasks
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const taskList = orderedTasks.map((currentTask, index) => {
    return (
      <Task
        key={index}
        task={currentTask}
        taskIndex={index}
        handleActivateTask={handleActiveTask}
        activeTask={activeIndex}
      />
    );
  });

  return (
    <div className={classes["task_list_container"]}>
      <div className={classes["current_task"]}>#1</div>
      <p>Time to focus!</p>
      <div className={classes["task_list"]}>
        <div className={classes["task_list__header"]}>
          <div className={classes.title}>Tasks</div>
          <div className={classes.actions}>
            <button className={classes["task_list__header_button"]}>
              <img
                className={classes["header_button_img"]}
                src={ThreeDots}
                alt="three-dots"
              />
            </button>
          </div>
        </div>
        <div className={classes["task_list__body"]}>{taskList}</div>
        <TaskForm />
      </div>
    </div>
  );
};

export default TaskList;
