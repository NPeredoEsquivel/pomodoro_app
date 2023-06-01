import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClickHandler: () => void;
  disableButton: boolean;
  classProps?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClickHandler,
  disableButton,
  classProps,
}) => {
  return (
    <button
      className={classProps}
      disabled={disableButton}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
