import React from "react";
import classes from "./Task.module.scss";
import ThreeDotsTask from "@assets/img/vertical-ellipsis.png";
import { Task as TaskElement } from "@store/interfaces";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import {
  selectTasks,
  removeTask,
  updateTask,
} from "@store/slices/tasksSlice";
import { getActiveTask } from "@lib/helpers/helpers";
import { Task as TaskInterface } from "@store/interfaces";
import Button from "@UI/Button/Button";
type MyProps = {
  task: TaskElement;
  taskIndex: number;
};
interface MyDivEvent extends React.MouseEvent<HTMLDivElement> {
  target: HTMLDivElement;
}
interface MyButtonEvent extends React.MouseEvent<HTMLButtonElement> {
  target: HTMLButtonElement;
}

const Task: React.FC<MyProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  const removeTaskHandler = (event: MyButtonEvent, id: string) => {
    event.stopPropagation();
    dispatch(removeTask(id));
  };

  const completeTask = (event: MyDivEvent, id: string, completed: boolean) => {
    event.stopPropagation();
    dispatch(
      updateTask({ taskId: id, taskKey: "completed", taskValue: completed })
    );
  };

  const activateTaskHandler = (id: string) => {
    const activeTask: TaskInterface | undefined = getActiveTask(tasks);

    if (activeTask !== undefined) {
      dispatch(
        updateTask({
          taskId: activeTask.id,
          taskKey: "active",
          taskValue: false,
        })
      );
      dispatch(updateTask({ taskId: id, taskKey: "active", taskValue: true }));
    }
  };

  return (
    <div
      className={`${classes.task} ${task.active ? classes["is-active"] : ""}`}
      onClick={() => activateTaskHandler(task.id)}
    >
      <div className={classes["task-information"]}>
        <div
          className={`${classes["complete-task"]} ${task.completed ? classes["completed"] : ""
            }`}
          onClick={(event: MyDivEvent) => {
            completeTask(event, task.id, !task.completed);
          }}
        ></div>
        <span
          className={`${classes["task-information__name"]} ${task.completed ? classes["completed"] : ""
            }`}
        >
          {task.name}
        </span>
      </div>
      <Button
        className={classes["delete-button"]}
        onClickHandler={(event: MyButtonEvent) =>
          removeTaskHandler(event, task.id)
        }
        disabled={false}
      >
        Delete
      </Button>
      {/*TODO: Future improvement when adding actions to tasks */}
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
