import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound component for displaying 404 error pages
 * Shows when user navigates to unknown routes
 */
const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <Link to="/" className="back-home-btn">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
