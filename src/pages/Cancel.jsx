import React from 'react';
import '../styles/cancel.css' // Import the CSS file

const Cancel = () => {
  return (
    <div className="cancel-container">
      <h1>Cancelled</h1>
      <p>Your request has been cancelled.</p>
      <button>Go Back</button>
    </div>
  );
}

export default Cancel;
