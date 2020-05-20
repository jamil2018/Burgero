import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  meat: 1.2,
  bacon: 0.9,
};

export class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };
  async componentDidMount() {
    try {
      const ingredients = await axios.get(
        "https://burgero-91fc7.firebaseio.com/ingredients.json"
      );
      this.setState({ ingredients: ingredients.data });
    } catch (error) {
      this.setState({ error: true });
    }
  }
  updatePurchaseState = (ingredients) => {
    const sumIngredients = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((prev, next) => prev + next, 0);
    this.setState({ purchasable: sumIngredients > 0 });
  };

  purchasingHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasedHandler = async () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(i)}=${encodeURIComponent(
          this.state.ingredients[i]
        )}`
      );
    }
    queryParams.push(`price=${this.state.totalPrice}`);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };

    updatedIngredients[type] = updateCount;
    let newTotalPrice = this.state.totalPrice;
    newTotalPrice = newTotalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newTotalPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };
  removeIngredientHandler = (type) => {
    if (this.state.ingredients[type] !== 0) {
      const oldCount = this.state.ingredients[type];
      const updateCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients,
      };
      updatedIngredients[type] = updateCount;
      let newTotalPrice = this.state.totalPrice;
      newTotalPrice = newTotalPrice - INGREDIENT_PRICES[type];
      this.setState({
        ingredients: updatedIngredients,
        totalPrice: newTotalPrice,
      });
      this.updatePurchaseState(updatedIngredients);
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let modalContent = null;
    let burger = this.state.error ? (
      <p style={{ fontSize: "2rem", textAlign: "center" }}>
        Opps!!! Could not load application. Please try again later.
      </p>
    ) : (
      <Spinner />
    );
    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.purchasingHandler}
          />
        </>
      );
      modalContent = (
        <OrderSummary
          purchaseCancel={this.purchaseCancelHandler}
          purchase={this.purchasedHandler}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      modalContent = <Spinner />;
    }
    return (
      <>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {modalContent}
        </Modal>
        {burger}
      </>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
