import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClickHandler: () => void;
  disabled: boolean;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClickHandler,
  disabled,
  className,
}) => {
  return (
    <button className={className} disabled={disabled} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default Button;
