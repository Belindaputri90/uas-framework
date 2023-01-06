import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../img/slideshow/1.PNG";
import slide2 from "../img/slideshow/2.jpg";
import slide3 from "../img/slideshow/3.jpg";
// import Product from "./Product";
import About from "./About";

function Home() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img className="d-block w-100 mt-1" src={slide1} alt="First slide" />
          <Carousel.Caption className="text-slide">
            <h3 className="text-capitalize">Make your great days with us</h3>
            <p>Classic Beauty in Modern Way</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 mt-1" src={slide2} alt="First slide" />
          <Carousel.Caption className="text-slide">
            <h3 className="text-capitalize">With your great memories</h3>
            <p>Bring Your Lovely Memories With La Belle Blanc</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="d-block w-100 mt-1" src={slide3} alt="First slide" />
          <Carousel.Caption className="text-slide">
            <h3 className="text-capitalize">Summer Collection just for you</h3>
            <p>See What's New On Our Summer Collection</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* <Product /> */}
      <About />
    </>
  );
}

export default Home;
