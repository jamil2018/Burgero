import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const { salad, bacon, cheese, meat } = props.ingredients
    ? props.ingredients
    : { salad: 0, bacon: 0, cheese: 0, meat: 0 };

  return (
    <div className={classes.Order}>
      <p>
        <strong>Ingredients: </strong>
        <span>Salad: {salad}</span>
        <span>Bacon: {bacon}</span>
        <span>Cheese: {cheese}</span>
        <span>Meat: {meat}</span>
      </p>
      <p>
        <strong>Price: </strong>
        {props.price}
      </p>
    </div>
  );
};

export default Order;
