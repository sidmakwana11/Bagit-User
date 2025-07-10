import React from "react";
import { useCart } from "../../components/Context/CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeItem(id);
    toast.info("🗑️ Item removed from cart");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty. Add items before checkout.");
      return;
    }

    // ✅ Use sessionStorage instead of localStorage
    const token = sessionStorage.getItem("token");

    if (!token) {
      toast.info("Please login to continue to checkout.");
      navigate("/login");
      return;
    }

    navigate("/Checkout", {
      state: {
        cartItems,
        total,
      },
    });
  };

  return (
    <div className="cart-container">
      <ToastContainer position="top-right" autoClose={2000} />
      <h2 className="cart-heading">🛒 My Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <img
                  className="cart-item-image"
                  src={
                    item.image?.startsWith("/uploads/")
                      ? `http://localhost:5001${item.image}`
                      : item.image || "https://via.placeholder.com/150"
                  }
                  alt={item.name}
                />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p><strong>Size:</strong> {item.selectedSize}</p>
                  <p><strong>Price:</strong> ₹{item.price}</p>
                  <div className="quantity-buttons">
                    <button onClick={() => updateQuantity(item._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item._id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => handleRemove(item._id)}>
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Total Amount: ₹{total}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
