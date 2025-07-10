import React, { useState } from 'react';
import './profile.css';
import { toast } from 'react-toastify';

const Profile = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5002/api/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Password update failed");
      } else {
        toast.success("Password changed successfully!");
        setFormData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
      }

    } catch (err) {
      console.error("Password change error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="profile-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="password"
          name="currentPassword"
          placeholder="Current Password"
          value={formData.currentPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm New Password"
          value={formData.confirmNewPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default Profile;
