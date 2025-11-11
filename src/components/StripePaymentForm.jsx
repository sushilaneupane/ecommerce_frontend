
import React, { useState } from "react";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const StripePaymentForm = ({ amount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);

  const handleStripePayment = async () => {
    if (!stripe || !elements) return;

    setIsPaying(true);

    try {
      const res = await fetch("http://localhost:3001/api/payments/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const { clientSecret } = await res.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (err) {
      console.error(err);
      toast.error("Stripe payment failed.");
    }

    setIsPaying(false);
  };

  const inputStyle = {
    base: {
      fontSize: "16px",
      color: "#1f2937",
      fontFamily: "Inter, sans-serif",
      "::placeholder": { color: "#9ca3af" },
      padding: "10px 12px",
      letterSpacing: "0.5px",
    },
    invalid: { color: "#ef4444" },
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 text-center">Card Payment</h2>
      <p className="text-gray-500 text-center">Enter your card details below to complete the payment of <strong>Rs. {amount}</strong></p>

      <div className="space-y-4">
        {/* Card Number */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">Card Number</label>
          <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <CardNumberElement options={{ style: inputStyle }} />
          </div>
        </div>

        {/* Expiry */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">Expiry Date</label>
          <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <CardExpiryElement options={{ style: inputStyle }} />
          </div>
        </div>

        {/* CVC */}
        <div className="flex flex-col">
          <label className="text-gray-600 mb-1 font-medium">CVC</label>
          <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <CardCvcElement options={{ style: inputStyle }} />
          </div>
        </div>
      </div>

      <Button
        onClick={handleStripePayment}
        disabled={isPaying}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow-md transition-all"
      >
        {isPaying ? "Processing..." : `Pay Rs. ${amount}`}
      </Button>

      <p className="text-xs text-gray-400 text-center">Powered by <span className="font-semibold text-gray-500">Stripe</span></p>
    </div>
  );
};

export default StripePaymentForm;
