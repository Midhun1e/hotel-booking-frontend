import React from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import slide1 from "../../images/slide1.jpg";
import slide2 from "../../images/slide2.jpg";
import slide3 from "../../images/slide3.jpg";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

function Carousel() {
  const style = {
    "--slider-height-percentage": "45%",
    "--slider-transition-duration": "2000ms",
    "--organic-arrow-thickness": "4px",
    "--organic-arrow-border-radius": "30px",
    "--organic-arrow-height": "23px",
    "--organic-arrow-color": "#d5d5d5",
    "--control-button-width": "5%",
    "--control-button-height": "25%",
    "--control-button-background": "transparent",
    "--control-bullet-color": "#858080",
    "--control-bullet-active-color": "#d5d5d5",
    "--loader-bar-color": "transparent",
  };

  return (
    <AutoplaySlider style={style} play={true} cancelOnInteraction={false} interval={3500}>
      <div data-src={slide1} />
      <div data-src={slide2} />
      <div data-src={slide3} />
    </AutoplaySlider>
  );
}

export default Carousel;
