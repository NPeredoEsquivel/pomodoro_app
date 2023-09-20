import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClickHandler: () => void;
  disabled: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClickHandler,
  disabled,
  className,
  type = "button",
}) => {
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClickHandler}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
