import React, { useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Modal, Button } from 'react-bootstrap';

const Items = ({ user, equipment }) => {
  const [message, setMessage] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showBookingDetails, setShowBookingDetails] = useState(false); // New state to show booking details
  const [bookingDetails, setBookingDetails] = useState(null); // New state for booking information

  const isAvailable = () => {
    const today = moment();
    const availableStart = moment(equipment.availability.startDate);
    const availableEnd = moment(equipment.availability.endDate);
    return today.isBefore(availableEnd) || today.isAfter(availableStart)
    // return today.isBetween(availableStart, availableEnd, 'day', '[]');
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      const days = moment(end).diff(moment(start), 'days') + 1;
      setTotalAmount(days * equipment.pricePerDay);
    }
  };

  const handleRent = async () => {
    if (!startDate || !endDate) {
      setMessage('Please select rental dates.');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/equipment/rent/${equipment._id}`,
        {
          startDate,
          endDate,
          totalAmount,
          userId: user._id,
        }
      );
      setMessage('Equipment rented successfully!');
      setShowModal(false); // Close confirmation modal

      // Set booking details to display in the booking details modal
      setBookingDetails({
        equipmentName: equipment.name,
        rentalPeriod: `${moment(startDate).format('DD MMM YYYY')} - ${moment(endDate).format('DD MMM YYYY')}`,
        totalAmount,
      });
      setShowBookingDetails(true); // Show booking details modal
    } catch (err) {
      console.error(err);
      setMessage('Failed to rent equipment.');
    }
  };

  return (
    <div className="col p-2" key={equipment._id}>
      <div className="card mb-4">
        <img
          src={equipment.imageUrl}
          className="card-img-top"
          alt={equipment.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <div className="card-body">
          <h5 className="card-title">{equipment.name}</h5>
          <p className="card-text">{equipment.description}</p>
          <p className="card-text">
            <strong>Type:</strong> {equipment.type}
          </p>
          <p className="card-text">
            <strong>Location:</strong> {equipment.location}
          </p>
          <p className="card-text">
            <strong>Price per Day:</strong> ₹{equipment.pricePerDay}
          </p>
          <p className="card-text">
            <strong>Available from:</strong> {moment(equipment.availability.startDate).format('DD MMM YYYY')}
            <br />
            <strong>To:</strong> {moment(equipment.availability.endDate).format('DD MMM YYYY')}
          </p>
          {user._id !== equipment.ownerId && 
              <button
              className="btn btn-primary w-100"
              onClick={() => setShowModal(true)}
              disabled={!isAvailable()}
            >
              {isAvailable() ? 'Rent Now' : 'Not Available'}
            </button>
          }
          

          {message && <p className="mt-2 text-success">{message}</p>}
        </div>
      </div>

      {/* Confirm Rent Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Rental</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Equipment:</strong> {equipment.name}</p>
          <div className="mb-3">
            <label>Select Rental Period:</label>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              minDate={new Date(moment(equipment.availability.startDate) < moment() ? moment( ): moment(equipment.availability.startDate))}
              maxDate={new Date(equipment.availability.endDate)}
              className="form-control"
            />
          </div>
          <p><strong>Rental Period:</strong> {startDate ? moment(startDate).format('DD MMM YYYY') : 'Start Date'} - {endDate ? moment(endDate).format('DD MMM YYYY') : 'End Date'}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRent} disabled={!startDate || !endDate}>
            Confirm Rent
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Booking Details Modal */}
      <Modal show={showBookingDetails} onHide={() => setShowBookingDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {bookingDetails ? (
            <>
              <p><strong>Equipment:</strong> {bookingDetails.equipmentName}</p>
              <p><strong>Rental Period:</strong> {bookingDetails.rentalPeriod}</p>
              <p><strong>Total Amount:</strong> ₹{bookingDetails.totalAmount}</p>
            </>
          ) : (
            <p>Loading booking details...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowBookingDetails(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Items;
