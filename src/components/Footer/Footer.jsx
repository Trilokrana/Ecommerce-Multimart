import React from "react";
import "./Footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4">
            <div className="logo">
              <div>
                <h1 className="text-white">Multimart</h1>
              </div>
            </div>
            <p className="footer_text mt-4">
              Multimart brings the future of furniture to your doorstep. We
              curate a collection of thoughtfully designed pieces that combine
              functionality, style, and sustainability. Whether you're seeking
              sleek sofas, versatile storage solutions, or statement dining
              sets, our eco-conscious approach ensures quality and
              responsibility. 
            </p>
          </Col>
          <Col lg="3">
            <div className="footer_quick-links">
              <h4 className="quick_links-title text-white">Top Categories</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"} className="link">
                    Mobile Phones
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"} className="link">
                    Modern Phones
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"} className="link">
                    Arm Chair
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"} className="link">
                    Smart Watches
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="2">
            <div className="footer_quick-links">
              <h4 className="quick_links-title text-white">Useful Links</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/shop"} className="link">
                    Shop
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/cart"} className="link">
                    Cart
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"/login"} className="link">
                    Login
                  </Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to={"#"} className="link">
                    Privacy Policy
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer_quick-links">
              <h4 className="quick_links-title text-white">Contact</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span className="span">
                    <i class="ri-map-pin-line"></i>
                    <p>House No. 721, Uttrakhand, India</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span className="span">
                    <i class="ri-phone-line"></i>
                    <p>+91 01375 24914</p>
                  </span>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span className="span">
                    <i class="ri-mail-line"></i>
                    <p>Uk123@gmail.com</p>
                  </span>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer_copyright">
              <i class="ri-copyright-line"></i>
              Copyright {year} developed by Trilok Rana. All rights reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
