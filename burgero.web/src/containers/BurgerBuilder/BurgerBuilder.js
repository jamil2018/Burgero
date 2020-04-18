import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
  salad: 0.3,
  cheese: 0.5,
  meat: 1.2,
  bacon: 0.9,
};

export class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      meat: 0,
      bacon: 0,
    },
    totalPrice: 3,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Md. Hasnat Jamil",
        address: {
          houseNo: "house 27",
          road: "8",
          area: "Gulshan",
          city: "Dhaka",
          country: "Bangladesh",
        },
        email: "hasnatjamil2018@gmail.com",
      },
      deliveryMethod: "fastest",
    };
    try {
      const res = await axios.post("/orders.json", order);
      if (res.status === 200) {
        this.setState({ loading: false, purchasing: false });
      }
    } catch (e) {
      this.setState({ loading: false, purchasing: false });
      console.log(`Error: ${e.message}`);
    }
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
    if (this.state.loading) {
      modalContent = <Spinner />;
    } else {
      modalContent = (
        <OrderSummary
          purchaseCancel={this.purchaseCancelHandler}
          purchase={this.purchasedHandler}
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
        />
      );
    }
    return (
      <>
        <Burger ingredients={this.state.ingredients} />
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {modalContent}
        </Modal>
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
  }
}

export default BurgerBuilder;
