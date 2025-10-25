// BookingDetails.jsx
import './BookingDetails.css'; // Import your CSS file

import React from 'react';
import { useLocation } from 'react-router-dom';

const BookingDetails = () => {
  const location = useLocation();
  const { rentalInfo } = location.state || {}; // Extract rentalInfo from location state

  if (!rentalInfo) {
    return <h2>No booking details available.</h2>; // Handle case when no details are passed
  }

  return (
    <div className="booking-details">
      <h2>Booking Details</h2>
      <p><strong>Equipment:</strong> {rentalInfo.equipmentName}</p>
      <p><strong>Rental Period:</strong> {rentalInfo.rentalPeriod} days</p>
      <p><strong>Total Amount:</strong> ${rentalInfo.totalAmount}</p>
    </div>
  );
};

export default BookingDetails;
