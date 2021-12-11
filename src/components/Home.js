import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home_row">
          <Product
            id="1234"
            title="the lean start"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            price={11.99}
            rating={5}
          />
          <Product
            id="12345"
            title="the lean start"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            price={11.99}
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product
            id="12346"
            title="the lean start"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            price={11.99}
            rating={5}
          />
          <Product
            id="12347"
            title="the lean start"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            price={11.99}
            rating={5}
          />
          <Product
            id="12348"
            title="the lean start"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            price={11.99}
            rating={5}
          />
        </div>
        <div className="home_row">
          <Product
            id="12349"
            title="the lean start"
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            price={11.99}
            rating={5}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
