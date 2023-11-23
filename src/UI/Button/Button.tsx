import React from "react";

interface MyButtonEvent extends React.MouseEvent<HTMLButtonElement> {
  target: HTMLButtonElement;
}

interface ButtonProps {
  children: React.ReactNode;
  onClickHandler?: (event: MyButtonEvent) => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClickHandler,
  disabled = false,
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
