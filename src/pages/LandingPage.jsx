import React from "react";
import SearchComponent from "../components/common/SearchComponent";
import Carousel from "../components/common/Carousel";
import AboutHome from "../components/landingPageComponent/AboutHome";
import SpecialitySection from "../components/landingPageComponent/SpecialitySection";

function LandingPage() {
  return (
    <div>
      <Carousel />
      <SearchComponent initialValues={null} />
      <AboutHome />
      <SpecialitySection />
    </div>
  );
}

export default LandingPage;
