import React from "react";
import classes from "./DrawerToggler.module.css";
import { FaBars } from "react-icons/fa";

const DrawerToggler = (props) => {
  return (
    <div onClick={props.clicked}>
      <FaBars className={classes.Icon} />
    </div>
  );
};

export default DrawerToggler;
