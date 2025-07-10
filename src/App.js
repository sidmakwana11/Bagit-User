import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Navbar from './components/navbar/navbar';
import LandingPage from './pages/landingpage/landingpage';
import Login from './user-auth/login/login';
import Register from './user-auth/Register/Register';
import Email from './components/emailConfirmation/email';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from './pages/products/products.jsx';
import ProductCard from './components/product-card/product-card';
import Profile from './pages/profile/profile';
import Cart from './pages/cart/cart';
import { CartProvider } from './components/Context/CartContext';
import Checkout from './pages/checkout/checkout';
import Payment from './pages/Payment/payment';
import SearchResults from './components/SearchResults/searchResults';

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Header />
        <Navbar />
        <ToastContainer position="top-right" autoClose={3000} />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products/:category/:subCategory/:subSubCategory" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/ProductCard" element={<ProductCard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/MailConfirmation" element={<Email />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Search" element={<SearchResults />} />
          </Routes>
        </div>

      </CartProvider>
    </BrowserRouter>

  );
};

export default App;
