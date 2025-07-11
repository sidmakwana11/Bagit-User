import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import "./login.css";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    number: '',
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePanel = () => {
    setIsSignup(!isSignup);
    setFormData({
      name: "",
      number: '',
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://bagit-admin-service.onrender.com/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.number,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
      } else {
        toast.success("Signup successful! Please login.");
        togglePanel();
      }
    } catch (err) {
      toast.error("Something went wrong during signup");
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("https://bagit-admin-service.onrender.com/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        toast.error(data.message || "Login failed");
      } else {
        toast.success("Welcome back!");
  
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        console.log("Token set in sessionStorage:", sessionStorage.getItem("token"));
  
        try {
          const decoded = jwtDecode(data.token);
          console.log("Logged in as:", decoded.email);
        } catch (decodeErr) {
          console.warn("Invalid token format");
        }
  
        window.dispatchEvent(new Event("user-auth-changed")); // ✅ tells Header to update
        navigate("/"); // ✅ redirect without reload
      }
    } catch (err) {
      toast.error("Something went wrong during login");
      console.error(err);
    }
  };
  

  return (
    <div className={`container ${isSignup ? "right-panel-active" : ""}`}>

      {/* LOGIN FORM */}
      <div className="form-container sign-in-container">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      {/* SIGNUP FORM */}
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignup}>
          <h1>Signup</h1>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="number"
            placeholder="Mobile Number"
            value={formData.number}
            onChange={handleChange}
            maxLength={10}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Signup</button>
        </form>
      </div>

      {/* OVERLAY PANELS */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Already a customer?</h1>
            <p>Login to your account to continue</p>
            <button className="ghost" onClick={togglePanel}>
              Login
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>New customer?</h1>
            <p>Signup now to get started</p>
            <button className="ghost" onClick={togglePanel}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
