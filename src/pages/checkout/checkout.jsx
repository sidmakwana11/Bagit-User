import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import "./checkout.css";

const stripePromise = loadStripe("pk_test_51RgLLqPYOzBd0QMIoOjzYy2sXWEVVHW9fQFP8uqCuwLRZGMomO8XZaQyBEGpZKHeTJq2c4X3YZIjqIWXBiWpn8Zz00gWsmJ5Gd"); // Replace with your actual Stripe public key
 
const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const cartItems = state?.cartItems || [];
  const total = state?.total || 0;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [showAddress, setShowAddress] = useState(false);
  const [address, setAddress] = useState("");
 
  useEffect(() => {
    if (!state) {
      toast.error("Cart data not available. Redirecting to cart...");
      navigate("/Cart");
    }
  }, [state, navigate]);

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast.warn("Please select a payment method.");
      return;
    }

    if (paymentMethod === "COD") {
      if (!address.trim()) {
        toast.warn("Please enter your delivery address.");
        return;
      }

      toast.success("Order placed with Cash on Delivery.");
      navigate("/Payment");
      return;
    }

    // Stripe Payment via fetch
    try {
      const stripe = await stripePromise;

      const response = await fetch("http://localhost:5001/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          shipping: 50,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await stripe.redirectToCheckout({ sessionId: data.id });
      } else {
        throw new Error(data.error || "Stripe checkout failed.");
      }
    } catch (error) {
      console.error("Stripe Error:", error);
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div className="checkout-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="checkout-heading">Checkout Summary</h2>

      <div className="checkout-content">
        <div className="checkout-items">
          {cartItems.map((item) => (
            <div className="checkout-item" key={item._id}>
              <img
                className="checkout-item-image"
                src={
                  item.image?.startsWith("/uploads/")
                    ? `http://localhost:5001${item.image}`
                    : item.image || "https://via.placeholder.com/150"
                }
                alt={item.name}
              />
              <div className="checkout-details">
                <h4>{item.name}</h4>
                <p>Size: {item.selectedSize || "M"}</p>
                <p>Qty: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Total: ₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-summary-box">
          <h3>Payment Summary</h3>
          <p>Subtotal: ₹{total}</p>
          <p>Shipping: ₹50</p>
          <hr />
          <h2>Grand Total: ₹{total + 50}</h2>

          <div className="payment-options">
            <h4>Select Payment Method:</h4>
            <label>
              <input
                type="radio"
                name="payment"
                value="Card"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setShowAddress(false);
                }}
              />
              Debit / Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="COD"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setShowAddress(true);
                }}
              />
              Cash on Delivery (COD)
            </label>
          </div>

          {showAddress && (
            <textarea
              className="cod-address-box"
              rows="4"
              placeholder="Enter your delivery address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          )}

          <button className="pay-now-btn" onClick={handlePayment} disabled={!paymentMethod}>
            {paymentMethod === "COD" ? "Place Order" : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
