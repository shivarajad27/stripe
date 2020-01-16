import React, { Component } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

export default class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <StripeProvider apiKey="pk_test_qLJ11MAZObOKOZOjrowA1NUn00StmA774f">
        <Elements>
          <CheckoutForm
            selectedProduct={this.props.selectedProduct}
            history={this.props.history}
          />
        </Elements>
      </StripeProvider>
    );
  }
}
