import React from "react";
import "./HeroSection.css";
import welcomeImg from "../../assets/welcome_to.jpg";

const HeroSection = () => {
  return (
    <section className="home-hero">
      <div
        className="home-hero__bg"
        style={{ backgroundImage: `url(${welcomeImg})` }}
      />
      <div className="home-hero__overlay" />

      <div className="home-hero__content">
        <div className="home-hero__subtitle">Welcome to</div>
        <h1 className="home-hero__title">Sweet Bakery</h1>
        <p className="home-hero__tagline">where every bite brings a smile!</p>
      </div>
    </section>
  );
};

export default HeroSection;

