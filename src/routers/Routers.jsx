import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import  ProductDetails  from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={"/home"} />}></Route>
        <Route path="home" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
      </Routes>
    </>
  );
};

export default Routers;
