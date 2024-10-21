// src/components/WelcomeEmail.js
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const WelcomeEmail = ({ token }) => {
  const preferencesLink = `http://localhost:3000/preferences/${token}`;

  return (
    <Card style={{ maxWidth: 600, margin: 'auto', padding: '20px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <CardContent>
        <Typography variant="h4" color="primary" gutterBottom>
          🎉 Welcome to Our Newsletter!
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for signing up! Click the button below to set your preferences.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={preferencesLink}
          style={{ marginTop: '10px' }}
        >
          Set Preferences
        </Button>
        <Typography variant="body2" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          © 2024 Newsletter App. All rights reserved.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WelcomeEmail;
