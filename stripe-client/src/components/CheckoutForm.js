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
      receiptUrl: null,
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      this.setState({
        error: null
      });
      const { token, error } = await this.props.stripe.createToken({
        name: "customer name"
      });

      if (!error) {
        const order = await axios.post(
          "http://localhost:7000/api/stripe/charge",
          {
            amount: this.props.selectedProduct.price
              .toString()
              .replace(".", ""),
            source: token.id,
            receipt_email: "customer@example.com"
          }
        );

        this.setState({
          receiptUrl: order.data.charge.receipt_url
        });
      } else {
        throw error;
      }
    } catch (error) {
      debugger;
      console.log(error.message);
      this.setState({
        error: error.message
      });
    }
  };

  render() {
    if (this.state.receiptUrl) {
      return (
        <div className="success">
          <h2>Payment Successful!</h2>
          <a href={this.state.receiptUrl} target="blank">
            View Receipt
          </a>
          <Link to="/">Home</Link>
        </div>
      );
    }

    const error = this.state.error !== null && (
      <span className="error">{this.state.error}</span>
    );

    return (
      <div className="checkout-form">
        {error}
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
