import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import classes from "./TaskForm.module.scss";
import AddTask from "../../../../assets/img/plus-circle-white.png";
import CaretUp from "../../../../assets/img/caret-up.png";
import CaretDown from "../../../../assets/img/caret-down.png";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  selectTasks,
  addTask,
  updateTask,
} from "../../../../store/slices/tasksSlice";
import { getActiveTask } from "../../../../lib/helpers/helpers";
import Button from "../../../../UI/Button/Button";

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const modalRef = useRef<null | HTMLDivElement>(null);
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    setOpenModal((prevOpenModal) => !prevOpenModal);
  };

  const handleCancelAction = () => {
    setOpenModal((prevOpenModal) => !prevOpenModal);
  };

  const onTaskNameChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTaskName(event.target.value);

  const handleSubmitTask = () => {
    const activeTask = getActiveTask(tasks);

    if (activeTask !== undefined) {
      dispatch(
        updateTask({
          taskId: activeTask.id,
          taskKey: "active",
          taskValue: false,
        })
      );
    }

    dispatch(addTask(taskName));
    setTaskName("");
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (openModal) {
      modalRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [openModal]);
  return (
    <div className={classes.task_form}>
      <div
        className={`${classes["task-form-action"]} ${!openModal ? "" : classes["display-none"]
          }`}
        onClick={handleOpenModal}
      >
        <img src={AddTask} alt="add-task" />
        <div className={classes["action"]}>Add Task</div>
      </div>
      <div
        className={`${classes["task-form"]} ${openModal ? "" : classes["display-none"]
          }`}
        ref={modalRef}
      >
        <div className={classes["task-form-body"]}>
          <div className={classes["task-title-input"]}>
            <input
              className={classes["task-title"]}
              type="text"
              placeholder="Whare are you working on?"
              value={taskName}
              onChange={onTaskNameChange}
              id="taskName"
              name="taskName"
            />
          </div>
          {/* <div className={classes["est-pomodoro"]}>
            <div className={classes["est-pomodoro-title"]}>Est Pomodoros</div>
            <div className={classes["est-pomodoro-action"]}>
              <input
                className={classes["est-pomodoro-input"]}
                type="number"
                placeholder="1"
              />
              <button>
                <img src={CaretUp} alt="" />
              </button>
              <button>
                <img src={CaretDown} alt="" />
              </button>
            </div>
          </div> */}
        </div>
        <div className={classes["task-form-footer"]}>
          <div className={classes["action-buttons"]}>
            <Button
              className={classes["cancel-button"]}
              onClickHandler={handleCancelAction}
              disabled={false}
            >
              Cancel
            </Button>
            <Button
              className={classes["save-button"]}
              onClickHandler={handleSubmitTask}
              disabled={false}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
