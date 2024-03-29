import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Removed duplicate import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; 


const specialOrderPageStyles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif', // Add your preferred font-family
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#007bff', // Adjust the color
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textarea: {
    width: '100%',
    minHeight: '150px',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical', // Allow vertical resizing
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
};

function SpecialOrderPage() { 
  const [request, setRequest] = useState('');
  const [error, setError] = useState('');
  const [confirmation, setConfirmation] = useState(''); // New state for confirmation message
  const navigate = useNavigate();

  const API_URL = 'https://easydine202434.onrender.com//special-order';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setConfirmation(''); // Reset confirmation message

    const token = sessionStorage.getItem('jwt_token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(API_URL, { request }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setConfirmation('Your special order has been placed successfully.');
        setTimeout(() => {
          navigate('/'); // Redirect to home page after 3 seconds
        }, 3000);
      } else {
        setError('Failed to place special order.');
      }
    } catch (error) {
      console.error('Error placing special order:', error);
      setError('An error occurred while placing the order.');
    }
  };

  return (
    <div style={specialOrderPageStyles.container}>
      <h1 style={specialOrderPageStyles.heading}>Place a Special Order</h1>
      {error && <div style={specialOrderPageStyles.error}>{error}</div>}
      {confirmation && <div style={specialOrderPageStyles.confirmation}>{confirmation}</div>}
      <form onSubmit={handleSubmit} style={specialOrderPageStyles.form}>
        <textarea
          value={request}
          onChange={(e) => setRequest(e.target.value)}
          style={specialOrderPageStyles.textarea}
          placeholder="Describe your special request"
        />
        <button
          type="submit"
          style={Object.assign(
            {},
            specialOrderPageStyles.button,
            specialOrderPageStyles.buttonHover
          )}
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default SpecialOrderPage;


