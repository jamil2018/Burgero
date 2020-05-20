import React, { Component } from "react";
import classes from "./ContactData.module.css";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import axios from "../../../axios-orders";
import { withRouter } from "react-router-dom";
import Input from "../../../components/UI/Input/Input";

export class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };
  orderHandler = async (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
        this.setState({ loading: false });
        this.props.history.push("/");
      }
    } catch (e) {
      this.setState({ loading: false });
      console.log(`Error: ${e.message}`);
    }
    console.log(order);
  };
  render() {
    const form = this.state.loading ? (
      <Spinner />
    ) : (
      <form>
        <Input
          label="Name"
          inputData={{
            placeholder: "Please enter your name",
            name: "name",
            type: "text",
          }}
          type="input"
        />
        <Input
          label="Email"
          inputData={{
            placeholder: "Please enter your email address",
            name: "email",
            type: "email",
          }}
          type="input"
        />
        <Input
          label="Street"
          inputData={{
            placeholder: "Please enter your street name",
            name: "street",
            type: "text",
          }}
          type="input"
        />
        <Input
          label="Postal Code"
          inputData={{
            placeholder: "Please enter the postal code of your area",
            name: "postCode",
            type: "text",
          }}
          type="input"
        />
        <div>
          <Button btnType="Success" click={this.orderHandler}>
            Place Order
          </Button>
        </div>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h2>Enter your contact information</h2>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);
