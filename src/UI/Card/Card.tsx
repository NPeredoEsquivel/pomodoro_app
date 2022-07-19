import React from 'react'
import classes from './Card.module.scss';

type CardProps = {
  children: React.ReactNode;
};

export default class Card extends React.Component<CardProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={classes.classlala}>Card</div>
    )
  }
}
