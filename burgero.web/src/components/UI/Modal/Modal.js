import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  const modalClasses = props.show
    ? `${classes.Modal} ${classes.Visible}`
    : `${classes.Modal}`;

  return (
    <>
      <Backdrop show={props.show} modalClosed={props.closeModal} />
      <div className={modalClasses}>{props.children}</div>
    </>
  );
};

export default Modal;
