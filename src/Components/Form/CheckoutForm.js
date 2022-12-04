import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutForm = ({ appointment }) => {
  const { patient, email, servicePrice, serviceName, _id } = appointment;
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [transactionID, setTransactionID] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(
      "https://doctors-portal-server-one-eta.vercel.app/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("doctors-token")}`,
        },
        body: JSON.stringify({ servicePrice }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [servicePrice]);

  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setPaymentError(error.message);
    } else {
      setPaymentError("");
      // console.log("paymentMethod: ", paymentMethod);
    }
    // confirm payment
    setSuccessMessage("");
    setPaymentError("");
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient,
            email: email,
          },
        },
      });
    if (confirmError) {
      setPaymentError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // store payment info to database
      const payment = {
        serviceName,
        orderedId: _id,
        servicePrice,
        email,
        transactionId: paymentIntent.id,
      };
      fetch("https://doctors-portal-server-one-eta.vercel.app/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${localStorage.getItem("doctors-token")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccessMessage("Congrats! your payment is successful.");
            setTransactionID(paymentIntent.id);
            navigate("/dashboard/my-appointments");
            toast.success("Congrats! your payment is successful.");
          }
        });
    }
  };

  return (
    <div className="mt-10 w-96">
      {paymentError && (
        <p className="text-red-500 text-center">Error: {paymentError}</p>
      )}
      {successMessage && (
        <div>
          <p className="text-green-500 text-center">{successMessage}</p>
          <p className="text-center">
            Transaction Id: <span className="font-bold">{transactionID}</span>
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col mt-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-xs mt-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
