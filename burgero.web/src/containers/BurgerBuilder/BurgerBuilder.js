import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  meat: 1.2,
  bacon: 0.9
};

export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0
    },
    totalPrice: 0
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updateIngredients = {
      ...this.state.ingredients
    };

    updateIngredients[type] = updateCount;
    let newTotalPrice = this.state.totalPrice;
    newTotalPrice = newTotalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updateIngredients,
      totalPrice: newTotalPrice
    });
  };
  removeIngredientHandler = type => {
    if (this.state.ingredients[type] !== 0) {
      const oldCount = this.state.ingredients[type];
      const updateCount = oldCount - 1;
      const updateIngredients = {
        ...this.state.ingredients
      };
      updateIngredients[type] = updateCount;
      let newTotalPrice = this.state.totalPrice;
      newTotalPrice = newTotalPrice - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updateIngredients,
        totalPrice: newTotalPrice
      });
    }
  };
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
        />
      </>
    );
  }
}

export default BurgerBuilder;
