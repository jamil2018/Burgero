import React from "react";
import classes from "./OrderSummary.module.css";
import { FaCheese, FaBacon, FaDrumstickBite, FaCarrot } from "react-icons/fa";
import Button from "../../UI/Button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    let icon = null;
    switch (igKey) {
      case "cheese":
        icon = <FaCheese />;
        break;
      case "salad":
        icon = <FaCarrot />;
        break;
      case "bacon":
        icon = <FaBacon />;
        break;
      case "meat":
        icon = <FaDrumstickBite />;
        break;
      default:
        icon = null;
    }
    return (
      <li key={igKey}>
        <span className={classes.IngredientName}>
          <span className={classes.IngredientIcon}>{icon}</span>
          {igKey}
        </span>
        <span>: {props.ingredients[igKey]}</span>
      </li>
    );
  });
  return (
    <>
      <h3 className={classes.Heading}>Your Order</h3>
      <p className={classes.SubHeading}>
        A delicious burger made with the following ingredients:
      </p>
      <ul className={classes.Ingredients}>{ingredientSummary}</ul>
      <p className={classes.prompt}>Continue to checkout?</p>
      <div className={classes.ConfirmButtons}>
        <Button btnType="Success" click={props.purchase}>
          Yes
        </Button>
        <Button btnType="Danger" click={props.purchaseCancel}>
          No
        </Button>
      </div>
    </>
  );
};

export default OrderSummary;
