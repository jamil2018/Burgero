import React from "react";
import logo from "../../assets/logo.png";
import classes from "./Logo.module.css";

const Logo = () => (
  <div>
    <img className={classes.Logo} src={logo} alt="logo" />
  </div>
);

export default Logo;
