import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommanSection from "../components/UI/CommonSection";
import "../styles/Checkout.css";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Opc95SDgWMU2JHZ3ruwRCzgg2Baxz8tghPDdlDiZdAY6LiSMsw0kRpS9ouHJXWhpi4kjLY8NJmxiIEYTtZk48Ja00nMKWWUdw"
    );
    const body = {
      products: cartItems,
    };
    console.log(body);

    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    console.log(response);

    const session = await response.json();
    console.log(session);

    const result = await stripe.redirectToCheckout({
      sesssionId: session.id,
    });
    console.log(result);

    if (result.error) {
      console.log(result.error);
    }
  };
  return (
    <Helmet title="Checkout">
      <CommanSection title="Checkout"></CommanSection>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h2 className="mb-4 fw-bold">Billing Information</h2>
              <Form className="billing_form">
                <FormGroup className="form_group">
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="email" placeholder="Enter your email" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Street Adress" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="City" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Postal Code" />
                </FormGroup>
                <FormGroup className="form_group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout_cart ">
                <h6>
                  Total Quantity : <span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal : <span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping:
                    <br /> Free shipping
                  </span>
                  <span>$0</span>
                </h6>

                <h4>
                  Total Cost : <span>${totalAmount}</span>
                </h4>
                <button
                  className="buy_btn auth_btn w-100 p-2"
                  style={{
                    backgroundColor: "white",
                    color: "var(--primary-color)",
                  }}
                  onClick={makePayment}
                >
                  Place an order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
