// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreferencesPage from './components/PreferencesPage';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUpForm />} />
          <Route path="/preferences/:token" element={<PreferencesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
