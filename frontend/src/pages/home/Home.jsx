import React from "react";
import HomeBar from "./HomeBar.jsx";
import HeroSection from "./HeroSection.jsx";
import WhyChoose from "./WhyChoose.jsx";
import MenuHome from "./MenuHome.jsx";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <WhyChoose />
      <MenuHome />
      {/* Other home content sections go below */}
    </div>
  );
};

export default Home;