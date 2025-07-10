import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';
import { FaArrowLeft } from 'react-icons/fa';
import './Email.css';

const Email = () => {
  const navigate = useNavigate();

  const handleBackToShopping = () => {
    navigate('/');
  };

  return (
    <div className="email-page">
      <div className="email-card">
        <FiCheckCircle className="email-icon success-icon" />
        <h2>Registration Successful</h2>
        <div className="email-info">
          <AiOutlineMail className="info-icon" />
          <p>
            A confirmation email will be sent to your registered email address within <strong>2 business days</strong>.
          </p>
        </div>
        <p className="sub-info">
          If you do not receive the email, please check your spam folder or contact our support team.
        </p>
        <button className="back-button" onClick={handleBackToShopping}>
          <FaArrowLeft className="btn-icon" />
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Email;
