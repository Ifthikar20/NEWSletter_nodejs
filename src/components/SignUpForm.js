// src/components/SignUpForm.js

import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3030/api/signup', { email });
      setMessage(response.data); // Display the response message
      setEmail(''); // Clear the input field
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data); // Display error from the backend
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div style={styles.container}>
      <h1>Subscribe to Our Newsletter</h1>
      <form onSubmit={handleSignUp} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    color: 'green',
  },
};

export default SignUpForm;
