import React, { useContext, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { productsContext } from "../../context/productContext";
import { SeriesI } from "../../pages/CreateSeries/CreateSeries";
import "./CustomCarouesel.css";

const CustomCarousel = () => {
  const { series, getSeries } = useContext(productsContext);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button className="slick-arrow slick-prev"></button>,
    nextArrow: <button className="slick-arrow slick-next"></button>,
  };

  useEffect(() => {
    getSeries();
  }, []);

  return (
    <Slider {...sliderSettings} className="slider">
      {series.length > 0 &&
        series.map((series: SeriesI) => (
          <div key={series.id}>
            <video controls className="detail__video">
              <source src={series.video} type="video/mp4" />
            </video>
          </div>
        ))}
    </Slider>
  );
};

export default CustomCarousel;
