import React from "react";
import "./PolicyPage.css";

const PolicyPage = () => {
  return (
    <main className="info-page info-page--cream">
      <section className="info-page__section">
        <h1 className="info-page__title">Policy</h1>
        <p className="info-page__lead">
          Please read our ordering, cancellation and delivery policy before
          placing your cake order.
        </p>
      </section>

      <section className="faq">
        <details className="faq__item" open>
          <summary className="faq__question">
            How long in advance should I place an order?
          </summary>
          <p className="faq__answer">
            For birthday cakes we recommend booking 1-2 days in advance. For
            custom design cakes, please contact us 3-5 days earlier so we can
            prepare decoration and ingredients.
          </p>
        </details>

        <details className="faq__item">
          <summary className="faq__question">
            Do you offer same-day delivery?
          </summary>
          <p className="faq__answer">
            Yes, we have a limited number of ready-made cakes every day. Please
            call our hotline to check availability and delivery time.
          </p>
        </details>

        <details className="faq__item">
          <summary className="faq__question">
            What is the cancellation and refund policy?
          </summary>
          <p className="faq__answer">
            Orders cancelled 24 hours before pickup/delivery time can be
            rescheduled or converted to store credit. For orders cancelled
            later than that, please contact us directly and we will support
            case by case.
          </p>
        </details>

        <details className="faq__item">
          <summary className="faq__question">
            Do you have options for people with allergies?
          </summary>
          <p className="faq__answer">
            We can customize some cakes to be nut-free or low sugar, however we
            work in a kitchen that also handles nuts, dairy and gluten so we
            cannot guarantee 100% allergy free.
          </p>
        </details>
      </section>
    </main>
  );
};

export default PolicyPage;

