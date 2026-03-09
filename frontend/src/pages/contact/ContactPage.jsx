import React from "react";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <main className="info-page info-page--cream">
      <section className="info-page__section">
        <h1 className="info-page__title">Contact</h1>
        <p className="info-page__lead">
          Send us your cake idea and we will reply with suggestions, price and
          available time slot within 30 minutes in working hours.
        </p>
      </section>

      <section className="contact-layout contact-layout--single">
        <div className="contact-card">
          <h2 className="info-card__title">Contact details</h2>
          <p className="info-card__text">
            Phone / Zalo: <strong>+84 12345678</strong>
            <br />
            Email: <strong>sweetbakery@gmail.com</strong>
            <br />
            Address: No 1 Dai Co Viet, Hai Ba Trung, Ha Noi
          </p>
          <p className="info-card__text">
            Opening hours: 7:00 - 23:00
            <br />
            For same day orders, please call us directly.
          </p>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;

