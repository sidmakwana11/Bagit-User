import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) => item._id === product._id && item.selectedSize === size
      );

      if (existingItem) {
        return prev.map((item) =>
          item._id === product._id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prev, { ...product, selectedSize: size, quantity }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // 🔢 Cart item count for header
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        cartCount, // ✅ add to context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
