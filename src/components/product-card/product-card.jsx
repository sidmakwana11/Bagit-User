import React, { useState, useEffect } from "react";
import { useCart } from "../Context/CartContext";
import "./product-card.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");

  // 🧪 Log product and image URL once the component mounts
  useEffect(() => {
    console.log("Product received:", product);
    if (product?.image) {
      console.log("Full image URL:", `https://bagit-product-service.onrender.com${product.image}`);
    } else {
      console.warn("⚠️ No product.image found — using fallback image");
    }
  }, [product]);

  if (!product || typeof product !== "object") return null;

  const handleBuyNow = () => {
    addToCart(product, selectedSize, quantity);
  };

  return (
    <div className="product-card" key={product._id}>
      <img
        className="product-img"
        src={
          product.image
            ? `https://bagit-product-service.onrender.com${product.image}`
            : "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS2u2WwsbBPPMAMd64lz7oYUlzso1nlAaFFJAVi3oXrSS63GfbQTKfuLvSNWYKJWxdcFFyeTPSR2pIqgLZWaVxv_H9Ltxb5Qy7noudCDZJg6O_XAxXe4O57w1vOeqFi24MViqBg0-kPs0I&usqp=CAc"
        }
        alt={product.name || "Product Image"}
        onError={(e) => {
          console.error("❌ Image load failed:", e.target.src);
          e.target.src =
            "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS2u2WwsbBPPMAMd64lz7oYUlzso1nlAaFFJAVi3oXrSS63GfbQTKfuLvSNWYKJWxdcFFyeTPSR2pIqgLZWaVxv_H9Ltxb5Qy7noudCDZJg6O_XAxXe4O57w1vOeqFi24MViqBg0-kPs0I&usqp=CAc";
        }}
      />


      <div className="product-info">
        <div className="product-header">
          <h3>{product.name}</h3>
          <span className="price">₹{product.price}</span>
        </div>
        <p className="description">{product.description}</p>

        <label><strong>Size:</strong></label>
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          <option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
        </select>

        <div className="quantity-container">
          <strong>Quantity:</strong>
          <div className="quantity-buttons">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>

        <p>7 Days Return Policy</p>
        <button className="buy-button" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
