import React from 'react'
import Task from './Task/Task'
import TaskForm from './TaskForm/TaskForm';
import ThreeDots from '../../../assets/img/threedots-white.png';
import classes from './TaskList.module.scss';

type MyProps = {
  
}

type MyState = {
  activeIndex: number | null
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

export default class TaskList extends React.PureComponent<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)

    this.state = {
      activeIndex: null,
    }
  }

  handleActivateTask(taskIndex: number){
    this.setState({
      activeIndex: taskIndex,
    })
  }

  render() {
    return (
      <div className={classes['task-list-container']}>
        <div className={classes["current-task"]}>#1</div>
        <p>Time to focus!</p>
        <div className={classes['task-list']}>
          <div className={classes['task-list-header']}>
            <div className={classes.title}>Tasks</div>
            <div className={classes.actions}>
              <button className={classes['task-list-header-button']}>
                <img className={classes['header-buton-img']} src={ThreeDots} alt="three-dots"/>
              </button>
            </div>
          </div>
          <div className={classes['task-list-body']}>
            {tasks.map((currentTask, index) => {
              return <Task
                key={index}
                name={currentTask.name}
                taskIndex={index}
                handleActivateTask={this.handleActivateTask.bind(this)}
                activeTask={this.state.activeIndex}
              />
            })}
          </div>
          <div className={classes['task-form-container']}>
            <TaskForm />
          </div>
        </div>
      </div>
    );
  };
}
