import React, { useEffect, useState, useRef } from "react";
import classes from "./TaskForm.module.scss";
import AddTask from "../../../../assets/img/plus-circle-white.png";
import CaretUp from "../../../../assets/img/caret-up.png";
import CaretDown from "../../../../assets/img/caret-down.png";

const TaskForm: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const modalRef = useRef<null | HTMLDivElement>(null);

  const handleOpenModal = () => {
    setOpenModal((prevOpenModal) => !prevOpenModal);
  };

  const handleCancelAction = () => {
    setOpenModal((prevOpenModal) => !prevOpenModal);
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
            />
          </div>
          <div className={classes["est-pomodoro"]}>
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
          </div>
        </div>
        <div className={classes["task-form-footer"]}>
          <div>
            <button className={classes["delete-button"]}>Delete</button>
          </div>
          <div>
            <button
              className={classes["cancel-button"]}
              onClick={() => handleCancelAction()}
            >
              Cancel
            </button>
            <button className={classes["save-button"]}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
