import React from "react";

interface FormInputProps {
  htmlFor: string;
  label: string;
  ref: HTMLInputElement;
  inputAttr: {
    type: string;
    name: string;
    defaultValue: number | string;
    placeholder?: string;
  };
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    return (
      <>
        <label htmlFor={props.htmlFor}>{props.label}</label>
        <input ref={ref} {...props.inputAttr} />
      </>
    );
  }
);

export default FormInput;
