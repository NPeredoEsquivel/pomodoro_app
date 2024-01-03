import React from "react";
import Task from "@components/Task/Task";
import TaskForm from "@components/TaskForm/TaskForm";
import Card from "@UI/Card/Card";
import Button from "@UI/Button/Button";
import classes from "./TaskList.module.scss";
import { useAppSelector } from "@store/hooks";
import { selectTasks } from "@store/slices/tasksSlice";
import { Task as TaskInterface } from "@store/interfaces";
import { getActiveTask } from "@lib/helpers/helpers";
import ThreeDots from "@assets/img/threedots-white.png";

const TaskList: React.FC = () => {
  const tasks = useAppSelector(selectTasks);

  let taskList: null | JSX.Element[] = null;
  let activeTask: TaskInterface | undefined = getActiveTask(tasks);

  const isTaskListEmpty = Object.keys(tasks).length === 0;
  if (!isTaskListEmpty) {
    const orderedTasks = tasks
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    taskList = orderedTasks.map((currentTask, index) => {
      return <Task key={index} task={currentTask} taskIndex={index} />;
    });
  }

  return (
    <Card className={classes["task_list_container"]}>
      <div className={classes["current_task"]}>#1</div>
      <p>{activeTask === undefined ? <></> : activeTask.name}</p>
      <div className={classes["task_list"]}>
        <div className={classes["task_list__header"]}>
          <div className={classes.title}>Tasks</div>
          <div className={classes.actions}>
            {/* TODO: Actions on the list. */}
            <Button
              className={classes["task_list__header_button"]}
              disabled={true}
              onClickHandler={() => { }}
            >
              <img
                className={classes["header_button_img"]}
                src={ThreeDots}
                alt="three-dots"
              />
            </Button>
          </div>
        </div>
        <div className={classes["task_list__body"]}>
          {isTaskListEmpty ? <></> : taskList}
        </div>
        <TaskForm />
      </div>
    </Card>
  );
};

export default TaskList;
