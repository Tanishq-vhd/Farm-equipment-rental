import React from 'react';
import { useLocation } from 'react-router-dom';

const RentalDetails = () => {
    const location = useLocation();
    const rentalDetails = location.state;

    return (
        <div>
            <h2>Rental Details</h2>
            {rentalDetails ? (
                <div>
                    <p>Item: {rentalDetails.itemName}</p>
                    <p>Rented By: {rentalDetails.rentedBy}</p>
                    <p>Rental Period: {rentalDetails.period}</p>
                    <p>Total Cost: {rentalDetails.cost}</p>
                </div>
            ) : (
                <p>No rental details available.</p>
            )}
        </div>
    );
};

export default RentalDetails;
