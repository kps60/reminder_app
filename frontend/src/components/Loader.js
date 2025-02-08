import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', errorMessage }) => {
  return (
    <div className={`loader ${size}`} aria-label="Loading">
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default Loader;
