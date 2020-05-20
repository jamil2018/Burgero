import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
  let input = null;

  switch (props.type) {
    case "input":
      input = <input {...props.inputData} />;
      break;
    case "textArea":
      input = <textarea {...props.inputData}></textarea>;
      break;
    default:
      input = <input {...props.inputData} />;
  }

  return (
    <div className={classes.Input}>
      <label>{props.label}</label>
      {input}
    </div>
  );
};

export default Input;
