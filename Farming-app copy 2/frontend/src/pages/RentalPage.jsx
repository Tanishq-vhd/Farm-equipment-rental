// RentalPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RentalPage = () => {
  const [rentalPeriod, setRentalPeriod] = useState(1); // Default rental period
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  
  const equipmentName = "Tractor"; // Example equipment name, replace with actual equipment name
  const pricePerDay = 50; // Example price, replace with actual price

  const handleRentNow = () => {
    const total = rentalPeriod * pricePerDay; // Calculate total amount

    // Prepare rental info to pass to BookingDetails
    const rentalInfo = {
      equipmentName,
      rentalPeriod,
      totalAmount: total,
    };

    // Navigate to BookingDetails with rental info
    navigate('/booking-details', { state: { rentalInfo } });
  };

  return (
    <div>
      <h2>Rent Equipment</h2>
      <label>
        Rental Period (days):
        <input 
          type="number" 
          value={rentalPeriod} 
          onChange={(e) => setRentalPeriod(e.target.value)} 
          min="1" 
        />
      </label>
      <button onClick={handleRentNow}>Rent Now</button>
    </div>
  );
};

export default RentalPage;
