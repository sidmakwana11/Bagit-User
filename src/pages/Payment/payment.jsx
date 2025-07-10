import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./payment.css"; // Create CSS if needed

const Payment = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const success = params.get("success") === "true";
  const canceled = params.get("canceled") === "true";

  return (
    <div className="payment-container">
      {success && (
        <div className="payment-box success">
          <h2>✅ Payment Successful!</h2>
          <p>Thank you for your order.</p>
          <button onClick={() => navigate("/")}>Go to Home</button>
        </div>
      )}

      {canceled && (
        <div className="payment-box error">
          <h2>❌ Payment Cancelled</h2>
          <p>Your payment was not completed.</p>
          <button onClick={() => navigate("/Cart")}>Go Back to Cart</button>
        </div>
      )}

      {!success && !canceled && (
        <div className="payment-box">
          <h2>Processing...</h2>
        </div>
      )}
    </div>
  );
};

export default Payment;
