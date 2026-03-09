import React from "react";
import "./WhyChoose.css";

const EggIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 4.5C9.5 4.5 7 8 7 11c0 3 2.2 4.8 5 4.8s5-1.8 5-4.8c0-3-2.5-6.5-5-6.5Z"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MotobikeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    {/* Wheel */}
    <circle cx="7" cy="16.5" r="2" strokeWidth="1.6" />
    <circle cx="16.5" cy="16.5" r="2" strokeWidth="1.6" />
    {/* Frame */}
    <path
      d="M7 16.5 9.5 12h3l-2 4.5M11 10h2.2l1-1.5h2.3M13.5 12l2 4.5"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Handlebar and seat */}
    <path
      d="M11 9l-1-1.2M12 9.2h2"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const CakeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M6 10h12v7H6v-7Z"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 10c1 0 1 .8 2 .8s1-.8 2-.8 1 .8 2 .8 1-.8 2-.8 1 .8 2 .8"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path d="M9 7.5c0-.8.5-1.3.8-1.9" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M12 7.5c0-.8.5-1.3.8-1.9" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M15 7.5c0-.8.5-1.3.8-1.9" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const BadgeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M12 4.5 9.8 5.6 7.2 5.3 6.9 7.9 5.2 9.8 6.9 11.7 7.2 14.3l2.6-.3L12 15.1l2.2-1.1 2.6.3.3-2.6 1.7-1.9-1.7-1.9-.3-2.6-2.6.3L12 4.5Z"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m9.5 12 1.6 1.4L15 9.5"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhyChoose = () => {
  return (
    <section className="why-choose">
      <div className="why-choose__inner">
        <div>
          <h2 className="why-choose__left-title">Why Choose Savor Cake?</h2>
          <p className="why-choose__left-subtitle">
            Discover what makes Savor Cake truly special!
          </p>
        </div>

        <div className="why-choose__cards">
          <div className="why-choose__card">
            <div className="why-choose__icon">
              <EggIcon />
            </div>
            <p className="why-choose__card-text">
              A wide variety of the freshest fruits in Hanoi. 10 types: longan,
              lychee, grapes, strawberries, avocado, mango, cherry, kiwi,
              passion fruit, and blueberry.
            </p>
          </div>

          <div className="why-choose__card why-choose__card--solid">
            <div className="why-choose__icon">
              <MotobikeIcon />
            </div>
            <p className="why-choose__card-text">
              Fast delivery within 1 hour. Freshly made and shipped right after
              you order. No deposit needed for COD. Free shipping for orders
              from 350,000 VND.
            </p>
          </div>

          <div className="why-choose__card">
            <div className="why-choose__icon">
              <CakeIcon />
            </div>
            <p className="why-choose__card-text">
              Cakes for every occasion, sizes for 2–20 people. Over 150 designs
              for birthdays, events, and parties.
            </p>
          </div>

          <div className="why-choose__card why-choose__card--solid">
            <div className="why-choose__icon">
              <BadgeIcon />
            </div>
            <p className="why-choose__card-text">
              ISO 22000:2018 certified food safety guaranteed. Customer support
              available from 7 AM – 11 PM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;

