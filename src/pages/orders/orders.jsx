import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./orders.css";
import "react-toastify/dist/ReactToastify.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://bagit-product-service.onrender.com/api/orders");
        const data = await res.json();

        if (res.ok) {
          setOrders(data);
        } else {
          throw new Error(data.message || "Failed to fetch orders");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <ToastContainer />
      <h2 className="orders-title">My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found. <span className="go-shop" onClick={() => navigate("/")}>Go Shopping</span></p>
      ) : (
        orders.map((order, index) => (
          <div className="order-card" key={order._id || index}>
            <div className="order-header">
              <p><strong>Order ID:</strong> {order._id || `#ORD${index + 1001}`}</p>
              <p><strong>Order Date:</strong> {new Date(order.date).toLocaleString()}</p>
              <p><strong>Status:</strong> ✅ Success</p>
              <p><strong>Tracking:</strong> {order.trackingId || "TRACK" + (100000 + index)}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Address:</strong> {order.address || "N/A"}</p>
            </div>

            <div className="order-items">
              {order.items.map((item) => (
                <div className="order-item" key={item._id}>
                  <img
                    src={
                      item.image?.startsWith("/uploads/")
                        ? `https://bagit-product-service.onrender.com${item.image}`
                        : item.image || "https://via.placeholder.com/100"
                    }
                    alt={item.name}
                    className="order-item-img"
                  />
                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p><strong>Description:</strong> {item.description || "No description provided."}</p>
                    <p>Size: {item.selectedSize || "M"}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                    <p>Total: ₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;