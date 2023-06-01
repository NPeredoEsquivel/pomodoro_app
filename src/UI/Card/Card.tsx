import React from "react";

type CardProps = {
  className: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ className, children }) => {
  return <div className={`${className}`}>{children}</div>;
};

export default Card;
