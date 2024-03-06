import React, { useState, useRef } from "react";
import "./Header.css";
import { Container, Row } from "reactstrap";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import useAuth from "../../custom-hooks/useAuth";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { toast } from "react-toastify";

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const Navigate = useNavigate();
  const menuRef = useRef(null);
  const menuToggle = () => menuRef.current.classList.toggle("active_menu");
  const { currentUser } = useAuth();
  const [showProfileActions, setShowProfileActions] = useState(false);

  const cartShoppingBag = () => {
    Navigate("/cart");
  };
  const toggleProfileActions = () => {
    setShowProfileActions(!showProfileActions);
  };

  const Logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
        Navigate("/home");
      })
      .catch((error) => {
        toast.error(error.messsage);
      });
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav_active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav_icons">
              <span className="fav_icon">
                <i className="ri-heart-line"></i>
                <span className="badges">1</span>
              </span>
              <span className="cart_icon" onClick={cartShoppingBag}>
                <i className="ri-shopping-bag-line"></i>
                <span className="badges">{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.1 }}
                  src={currentUser ? currentUser.photoURL : userIcon}
                  alt="userIcon"
                  onClick={toggleProfileActions}
                />
                {showProfileActions && (
                  <div className="profile_actions text-white">
                    {currentUser ? (
                      <div className="account">
                        <h5>Hii, {currentUser.displayName}</h5>
                        <h6>{currentUser.email}</h6>
                        <hr></hr>
                        <h5 onClick={Logout}>Logout</h5>
                      </div>
                    ) : (
                      <div className="logged">
                        <Link className="links" to="/signup">
                          Signup
                        </Link>
                   
                        <Link className="links" to="/login">
                          Login
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="mobile_menu">
              <span onClick={menuToggle}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
