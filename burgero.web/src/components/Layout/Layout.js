import React from "react";
import classes from "./Layout.module.css";

const Layout = props => {
  return (
    <>
      <div>Toolbar, Sidedrawer, Backdrop</div>
      <main className={classes.content}>{props.children}</main>
    </>
  );
};

export default Layout;