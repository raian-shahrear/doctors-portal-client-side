import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "../../Components/Form/CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

const Payment = () => {
  const appointment = useLoaderData();
  const { serviceName, servicePrice, appointmentDate, slot } = appointment;


  return (
    <div>
      <h3 className="text-3xl font-semibold">
        Your appointment is {serviceName}
      </h3>
      <p className="mt-2">
        Please pay <span className="font-bold text-lg">${servicePrice}</span>{" "}
        for your appointment on {appointmentDate} at {slot}
      </p>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm appointment={appointment} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
