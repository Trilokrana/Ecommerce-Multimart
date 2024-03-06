import React from "react";
import "../styles/cart.css";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import { motion } from "framer-motion";
import { cartActions } from "../Redux/Slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useAuth from "../custom-hooks/useAuth";

const Cart = () => {
  const { currentUser } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="9">
              {cartItems?.length === 0 ? (
                <h2 className="fs-4 text-center">No item added to cart</h2>
              ) : (
                <table className="table bordered">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <Tr item={item} key={index} />
                    ))}
                  </tbody>
                </table>
              )}
            </Col>
            <Col lg="3">
              <div>
                <h6 className="d-flex align-items-center justify-content-between">
                  Subtotal
                  <span className="fs-4 fw-bold">${totalAmount}</span>
                </h6>
              </div>
              <p className="fs-6 mt-2">
                taxes and shipping will calculate in checkout
              </p>
              <div className="total_amount_btn">
                <button className="buy_btn" style={{ color: "white" }}>
                  <Link to="/shop" className="links">
                    Continue Shopping
                  </Link>
                </button>

                <button className="buy_btn" style={{ color: "white" }}>
                  {currentUser ? (
                    <Link to="/checkout" className="links">
                      Checkout
                    </Link>
                  ) : (
                    <Link to="/login" className="links">
                      Checkout
                    </Link>
                  )}
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };
  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>
        <Link to={`/shop/${item.id}`} className="cartlink">
          {item.productName}{" "}
        </Link>
      </td>
      <td>${item.price}</td>
      <td>{item.quantity}px</td>
      <td>
        <motion.i
          whileTap={{ scale: 1.2 }}
          class="ri-delete-bin-line"
          onClick={deleteProduct}
        ></motion.i>
      </td>
    </tr>
  );
};
export default Cart;
