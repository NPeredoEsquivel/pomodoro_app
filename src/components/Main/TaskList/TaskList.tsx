import React from 'react'
import Task from './Task/Task'
import classes from './TaskList.module.scss';

type MyProps = {
  
}

const tasks = [
  {
    name: 'task-1',
  },
  {
    name: 'task-2',
  },
  {
    name: 'task-3',
  },
  {
    name: 'task-4',
  },
  {
    name: 'task-5',
  }
]

export default class TaskList extends React.Component<MyProps, {}> {
  constructor(props: MyProps) {
    super(props)
  }

  render() {
    return (
      <div className={classes['task-list-container']}>
        <div className={"current-task"}>#1</div>
        <p>Time to focus!</p>
        <div className={classes['task-list']}>
          <div className={classes['task-list-header']}>
            <div className="title">Tasks</div>
            <div className="actions">...</div>
          </div>
          <div className={classes['task-list-body']}></div>
          {tasks.map((currentTask) => {
            return <Task name={currentTask.name}/>
          })}
        </div>
      </div>
    );
  };
}
