import React, { Component } from "react";
import Order from "../../components/Order/Order";
import WithErrors from "../../hoc/WithErrorHandler/WithErrorHandler";

import axios from "../../axios-orders";

export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  async componentDidMount() {
    try {
      const orders = await axios.get("./orders.json");
      const fetchedOrders = [];
      for (let key in orders.data) {
        fetchedOrders.push({ id: key, ...orders.data[key] });
      }
      this.setState({ orders: fetchedOrders, loading: false });
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    const orders = this.state.orders.map((order) => {
      return (
        <Order
          ingredients={order.ingredients}
          key={order.id}
          price={order.price}
        />
      );
    });
    return <div style={{ marginTop: "5rem" }}>{orders}</div>;
  }
}

export default WithErrors(Orders, axios);
