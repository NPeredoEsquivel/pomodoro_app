import React from 'react'
import classes from './Task.module.scss'
import ThreeDotsTask from '../../../../assets/img/vertical-ellipsis.png';

type MyProps = {
    name: string
}
type MyState = {}

export default class Task extends React.Component<MyProps, MyState> {
  constructor(props: MyProps){
    super(props)
  }
  render() {
    return (
      <div className={`${classes.task} ${classes['is-active']}`}>
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
