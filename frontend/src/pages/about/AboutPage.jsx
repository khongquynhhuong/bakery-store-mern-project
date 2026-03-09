import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
  return (
    <main className="info-page info-page--cream">
      <section className="info-page__section">
        <h1 className="info-page__title">About Sweet Bakery</h1>
        <p className="info-page__lead">
          We are a boutique bakery in Ha Noi, crafting fresh cakes every day
          with premium ingredients, low sugar recipes and a lot of love.
        </p>
      </section>

      <section className="info-page__grid">
        <div className="info-card">
          <h2 className="info-card__title">Our story</h2>
          <p className="info-card__text">
            Started from a small home kitchen in 2018, Sweet Bakery is now a
            favourite place for birthday celebrations, office parties and
            cozy afternoon tea with friends.
          </p>
        </div>
        <div className="info-card">
          <h2 className="info-card__title">What we believe</h2>
          <p className="info-card__text">
            Beautiful design, balanced sweetness and consistent quality. Every
            cake must be both instagrammable and truly delicious.
          </p>
        </div>
        <div className="info-card">
          <h2 className="info-card__title">Visit our store</h2>
          <p className="info-card__text">
            No 1 Dai Co Viet, Hai Ba Trung, Ha Noi
            <br />
            Opening hours: 7:00 - 23:00, every day.
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;

