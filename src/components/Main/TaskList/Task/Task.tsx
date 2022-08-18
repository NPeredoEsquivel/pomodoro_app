import React from 'react'
import classes from './Task.module.scss'

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
      <div className={classes.task}>
        <span></span>
        <span>{this.props.name}</span>
      </div>
    )
  }
}
