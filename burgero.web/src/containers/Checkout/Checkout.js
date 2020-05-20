import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route } from "react-router-dom";

export class Checkout extends Component {
  state = {
    ingredients: {
      salad: null,
      meat: null,
      cheese: null,
      bacon: null,
    },
    totalPrice: 0,
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const newIngredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        newIngredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: newIngredients, totalPrice: price });
  };

  continueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  cancelledHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancelledHandler={this.cancelledHandler}
          continueHandler={this.continueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={() => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
