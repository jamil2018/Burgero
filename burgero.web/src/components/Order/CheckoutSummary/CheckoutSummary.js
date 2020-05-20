import React from "react";
import Burger from "../../Burger/Burger";
import classes from "./CheckoutSummary.module.css";
import Button from "../../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!!!</h1>
      <div>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" click={props.cancelledHandler}>
        Cancel
      </Button>
      <Button btnType="Success" click={props.continueHandler}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
