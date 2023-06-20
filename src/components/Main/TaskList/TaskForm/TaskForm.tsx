import React, { useEffect, useState, useRef } from "react";
import classes from "./TaskForm.module.scss";
import AddTask from "../../../../assets/img/plus-circle-white.png";
import CaretUp from "../../../../assets/img/caret-up.png";
import CaretDown from "../../../../assets/img/caret-down.png";
import { useAppDispatch } from "src/store/hooks";
import { addTask } from "src/store/slices/tasksSlice";

const TaskForm: React.FC = () => {
  const [taskName, setTaskName] = useState("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const modalRef = useRef<null | HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    setOpenModal((prevOpenModal) => !prevOpenModal);
  };

  const handleCancelAction = () => {
    setOpenModal((prevOpenModal) => !prevOpenModal);
  };

  const onTaskNameChange = (e) => setTaskName(e.target.value);

  const handleSubmitTask = () => {
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
    <div>
      <div
        className={`${classes["task-form-action"]} ${
          !openModal ? "" : classes["display-none"]
        }`}
        onClick={() => handleOpenModal()}
      >
        <img src={AddTask} alt="add-task" />
        <div className={classes["action"]}>Add Task</div>
      </div>
      <div
        className={`${classes["task-form"]} ${
          openModal ? "" : classes["display-none"]
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
          {/* The delete button is when you already have an existing task. */}
          {/* <div>
            <button className={classes["delete-button"]}>Delete</button>
          </div> */}
          <div className={classes["action-buttons"]}>
            <button
              className={classes["cancel-button"]}
              onClick={() => handleCancelAction()}
            >
              Cancel
            </button>
            <button
              className={classes["save-button"]}
              onClick={handleSubmitTask}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
