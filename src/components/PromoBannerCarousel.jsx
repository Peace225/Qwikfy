import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const PromoBannerCarousel = ({ items }) => {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      arrows={false}
      showDots
      keyBoardControl
      containerClass="carousel-container"
      itemClass="px-2"
    >
      {items.map((item, index) => (
        <section
          key={index}
          className="bg-blue-900 text-white rounded shadow p-6 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="flex-1 mb-4 md:mb-0">
            <h2 className="text-4xl font-extrabold mb-2">{item.title.toUpperCase()}</h2>
            <p className="text-lg">{item.subtitle}</p>
            <p className="mt-2 text-yellow-300 font-semibold">{item.product}</p>
            <p className="text-2xl font-bold mt-1">
              {item.price} <span className="text-red-500 text-sm">{item.discount}</span>
            </p>
          </div>
          <div className="flex-1 text-center">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-48 mx-auto"
            />
          </div>
        </section>
      ))}
    </Carousel>
  );
};

export default PromoBannerCarousel;
