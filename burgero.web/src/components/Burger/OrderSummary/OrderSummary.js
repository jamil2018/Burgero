import React from "react";
import classes from "./OrderSummary.module.css";

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => (
    <li>
      <span className={classes.Capitalize}>{igKey}</span>:{" "}
      {props.ingredients[igKey]}
    </li>
  ));
  return (
    <>
      <h3 className={classes.Heading}>Your Order</h3>
      <p className={classes.SubHeading}>
        A delicious burger made with the following ingredients:
      </p>
      <ul className={classes.Ingredients}>{ingredientSummary}</ul>
      <p className={classes.prompt}>Continue to checkout?</p>
    </>
  );
};

export default OrderSummary;
