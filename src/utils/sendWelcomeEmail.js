// src/utils/sendWelcomeEmail.js

import React from 'react';
import { renderToString } from 'react-dom/server'; // Convert React component to HTML
import WelcomeEmail from '../components/WelcomeEmail'; // Import the component
import axios from 'axios'; // Axios to make HTTP requests

/**
 * Sends the welcome email by converting the React component to HTML
 * and sending it to the backend.
 * @param {string} email - Recipient's email address.
 * @param {string} token - JWT token for the user.
 */
const sendWelcomeEmail = async (email, token) => {
  const emailHTML = renderToString(<WelcomeEmail token={token} />); // Convert to HTML string

  try {
    const response = await axios.post('http://localhost:3030/api/send-email', {
      email,
      html: emailHTML, // Send the HTML content to the backend
    });

    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendWelcomeEmail;
