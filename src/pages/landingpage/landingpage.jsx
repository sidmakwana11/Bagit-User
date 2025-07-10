import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Carousel1 from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/carousel1.jpg";
import Carousel2 from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/carousel2.jpg";
import Carousel4 from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/carousel4.jpg";
import Rolex from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/Rolex.jpeg";
import Chanel from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/Chanel.jpeg";
import Dior from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/Dior.jpeg";
import Ck from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/CalvinKlien.jpeg";
import Versace from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/Versace.jpeg";

import Lacoste from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/Lacoste.jpeg";
import Gap from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/GAP.jpeg";
import Hm from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/H&M.jpeg";
import Armani from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/Armani.jpeg";
import Levis from "E:/projects/Webforest-internship/Task 2/E-commerce microservices/Client/user/src/assets/LEVIs.jpeg";

import "./landingpage.css";
import Footer from "../../components/footer/footer";
 
const SLIDE_INTERVAL = 5000;
const SLIDE_INTERVAL_SEC = SLIDE_INTERVAL / 1000;

const products = [
  { id: 1, name: 'Lorem Ipsum ', image: Rolex },
  { id: 2, name: 'Lorem Ipsum ', image: Chanel },
  { id: 3, name: 'Lorem Ipsum ', image: Dior },
  { id: 4, name: 'Lorem Ipsum ', image: Ck },
  { id: 5, name: 'Lorem Ipsum ',  image: Versace },
];

const deal_products = [
  { id: 1, name: 'Effortless. Elite. Lacoste. ', price: 40, image: Lacoste },
  { id: 2, name: 'Fill the GAP in fashion. ', price: 30, image: Gap },
  { id: 3, name: 'Hennes & Mauritz ', price: '45-60', image: Hm },
  { id: 4, name: 'Not just jeans — Armani ', price: 25, image: Armani },
  { id: 5, name: 'Live in Levi’s. ', price: 35, image: Levis },
];

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(SLIDE_INTERVAL_SEC);

  const handleChange = () => setTimeLeft(SLIDE_INTERVAL_SEC);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => (t === 1 ? SLIDE_INTERVAL_SEC : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="landing-page-container">
      <div className="landing-page" data-testid="landing-page">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={SLIDE_INTERVAL}
          transitionTime={700}
          onChange={handleChange}
          swipeable
          emulateTouch
          className="landing-carousel"
        >
          <div className="slide">
            <img src={Carousel1} alt="Slide 1" className="slide-img" />
          </div>
          <div className="slide">
            <img src={Carousel2} alt="Slide 2" className="slide-img" />
          </div>
          <div className="slide">
            <img src={Carousel4} alt="Slide 4" className="slide-img" />
          </div>
        </Carousel>
      </div>
      <div className="best-sellers-div">
        <h1 className="header-best-sellers">
          Luxury Brands
        </h1>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
            </div>
          ))}
        </div>
      </div>
      <div className="best-sellers-div">
        <h1 className="header-best-sellers">
          Biggest Deals on Top Brands
        </h1>
        <div className="deal-product-list">
            {deal_products.map(deal_product => (
              <div key={deal_product.id} className="deal-product-item">
                <img src={deal_product.image} alt={deal_product.name} />
                <h3>{deal_product.name}</h3>
                <h3>{deal_product.price}% Off</h3>
                <button>Shop Now</button>
              </div>
            ))}
        </div>
      </div>
      <div className="luxury-brand-container">
        <div className="luxury-brand-card">

        </div>
      </div>
      <Footer />
    </div>
  );
}
