import React from "react";
import classes from "./Card.module.scss";
import classNames from "classnames";

type CardProps = {
  className: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, children }) => {
  return (
    <div className={classNames(classes.container, className)}>{children}</div>
  );
};

export default Card;
