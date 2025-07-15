import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";

const Payment = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const startPayment = async () => {
      // 1. Get ride details (to get amount)
      const res = await fetch(`${API_BASE_URL}/api/rides/${rideId}`);
      const data = await res.json();
      const ride = data.ride || data;

      // 2. Create order on backend
      const orderRes = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: ride.costPerSeat }), // or total cost if multiple seats
      });
      const order = await orderRes.json();

      // 3. Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        const options = {
          key: "rzp_test_2DY4WhMDDHSBLH", // Replace with your Razorpay Key ID
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          name: "HopeAlong Ride Payment",
          description: `Payment for ride ${ride.from} → ${ride.to}`,
          handler: function (response) {
            // Payment success, redirect to feedback or dashboard
            navigate(`/feedback/${rideId}`);
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
          },
          theme: { color: "#6366f1" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
      document.body.appendChild(script);
    };

    startPayment();
  }, [rideId, navigate]);

  return <div className="p-8 text-center">Redirecting to payment...</div>;
};

export default Payment;