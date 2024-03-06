import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../Services/Services";
import ProductsList from "../components/UI/ProductsList";
import products from "./../assets/data/products";
import counterImg from "./../assets/images/counter-timer-img.png";
import Clock from "../components/UI/Clock";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setwirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );
    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );
    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );
    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setwirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, []);
  return (
    <div>
      <Helmet title="Home">
        <section className="hero_section">
          <Container>
            <Row>
              <Col lg="6" md="6">
                <div className="hero_content">
                  <p className="hero_subtitle ">
                    Trending Product in year {year}
                  </p>
                  <h2>Make Your Interior More Minimalistic & Modern</h2>
                  <p>
                    <h3>Embrace the serenity of minimalism: </h3>
                    Modernize your space! Craving a breath of fresh air in your
                    home? Ready to ditch the clutter and embrace tranquility?
                    Look no further than the transformative power of minimalism
                    and modern design. Imagine a home bathed in natural light,
                    where clean lines and simple elegance reign supreme. We'll
                    guide you through the journey of creating a space that
                    reflects your taste and fosters peace of mind.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    className="buy_btn"
                  >
                    <Link to="/shop" className="btn text-white ">
                      Shop Now
                    </Link>
                  </motion.button>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="hero_img">
                  <img src={heroImg} alt={"heroImage"} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <Services />
        <section className="trending_products">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section_title ">Trending Products</h2>
              </Col>
              <ProductsList data={trendingProducts} />
            </Row>
          </Container>
        </section>
        <section className="best_sales">
          <Container>
            <Row>
              <Col lg="12" className="text-center">
                <h2 className="section_title">Best Sales</h2>
              </Col>
              <ProductsList data={bestSalesProducts} />
            </Row>
          </Container>
        </section>
        <section className="timer_count">
          <Container>
            <Row>
              <Col lg="6" md="6" className="clock">
                <div className="clock_top_content">
                  <h3 className="text-white fs-6">Limited Time Offer </h3>
                  <h3 className="text-white fs-6">Quality ArmChair</h3>
                </div>
                <Clock />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="store_btn"
                >
                  <Link className="links" to={"/shop"}>
                    Visit Store
                  </Link>
                </motion.button>
              </Col>
              <Col lg="6" md="6" className="counter_img text-center ">
                <img src={counterImg} alt="" />
              </Col>
            </Row>
          </Container>
        </section>
        <section className="new_Arrivals">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section_titles">New Arrivals</h2>
              </Col>
              <ProductsList data={mobileProducts} />
              <ProductsList data={wirelessProducts} />
            </Row>
          </Container>
        </section>
        <section className="popular_category">
          <Container>
            <Row>
              <Col lg="12" className="text-center mb-5">
                <h2 className="section_titles">Popular in Category</h2>
              </Col>
              <ProductsList data={popularProducts} />
            </Row>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default Home;
