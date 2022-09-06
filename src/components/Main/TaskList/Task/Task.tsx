import React from 'react'
import classes from './Task.module.scss'
import ThreeDotsTask from '../../../../assets/img/vertical-ellipsis.png';

type MyProps = {
  taskIndex: number
  name: string
  handleActivateTask: (params: number) => void
  activeTask: number | null
}

type MyState = {
}

export default class Task extends React.Component<MyProps, MyState> {
  constructor(props: MyProps){
    super(props)
  }

  render() {
    return (
      <div className={`${classes.task} ${this.props.activeTask === this.props.taskIndex ? classes['is-active'] : '' }`} onClick={() => this.props.handleActivateTask(this.props.taskIndex)}>
        <div className={classes['task-information']}>
          <div className={classes['complete-task']}></div>
          <span>{this.props.name}</span>
        </div>
        <div className={classes['actions']}>
          <span>0/1</span>
          <div className={classes['task-button']}>
            <img className={classes['button-img']}src={ThreeDotsTask} alt="three-dots"/>
          </div>
        </div>
      </div>
    )
  }
}
