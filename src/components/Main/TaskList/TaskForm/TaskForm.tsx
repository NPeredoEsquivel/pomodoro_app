import React from 'react'
import classes from './TaskForm.module.scss'
import AddTask from '../../../../assets/img/plus-circle-white.png'
import CaretUp from '../../../../assets/img/caret-up.png'
import CaretDown from '../../../../assets/img/caret-down.png'

export default class TaskForm extends React.Component {
  render() {
    return (
      <div>
        <div className={classes['task-form-action']}>
          <img src={AddTask} alt="add-task" />
          <div className={classes['action']}>Add Task</div>
        </div>
        <div className={classes['task-form']}>
          <div className={classes['task-form-body']}>
            <div className={classes['task-title-input']}>
              <input className={classes['task-title']} type="text" placeholder="Whare are you working on?" />
            </div>
            <div className={classes['est-pomodoro']}>
              <div className={classes['est-pomodoro-title']}>Est Pomodoros</div>
              <div className={classes['est-pomodoro-action']}>
                <input className={classes['est-pomodoro-input']}type="number" placeholder='1'/>
                <button>
                  <img src={CaretUp} alt="" />
                </button>
                <button>
                  <img src={CaretDown} alt="" />
                </button>
              </div>
            </div>
          </div>
          <div className={classes['task-form-footer']}>
            <div>
              <button className={classes['delete-button']}>Delete</button>
            </div>
            <div>
              <button className={classes['cancel-button']}>Cancel</button>
              <button className={classes['save-button']}>Save</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
