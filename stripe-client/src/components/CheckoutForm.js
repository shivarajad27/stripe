import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe
} from "react-stripe-elements";
import axios from "axios";
import "../styles/CheckoutForm.scss";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receiptUrl: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    debugger;
    try {
      const { token } = await this.props.stripe.createToken({
        name: "customer name"
      });
      const order = await axios.post(
        "http://localhost:7000/api/stripe/charge",
        {
          amount: this.props.selectedProduct.price.toString().replace(".", ""),
          source: token.id,
          receipt_email: "customer@example.com"
        }
      );
      debugger;
      this.setState({
        receiptUrl: order.data.charge.receipt_url
      });
    } catch (error) {
      debugger;
      console.log(error);
    }
  };

  render() {
    if (this.state.receiptUrl) {
      return (
        <div className="success">
          <h2>Payment Successful!</h2>
          <a href={this.state.receiptUrl}>View Receipt</a>
          <Link to="/">Home</Link>
        </div>
      );
    }

    return (
      <div className="checkout-form">
        <p>Amount: ${this.props.selectedProduct.price}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Card details
            <CardNumberElement />
          </label>
          <label>
            Expiration date
            <CardExpiryElement />
          </label>
          <label>
            CVC
            <CardCVCElement />
          </label>
          <button type="submit" className="order-button">
            Pay
          </button>
        </form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
