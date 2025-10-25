import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import './Profile.css';
import AppContext from '../context/AppContext';

function Profile() {

    const { userInfo,listedEquipments,isLoading } = useContext(AppContext);

  return (
    <div className="container mt-5 profile-container">
      <h2 className="profile-title">User Profile</h2>

      <div className="card profile-card">
        <div className="card-body">
          <h5 className="card-title">Personal Information</h5>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Contact Info:</strong> {userInfo.contactInfo}</p>
        </div>
      </div>

      <h3 className="mt-5">Uploaded Equipment</h3>
      <div className="row mt-3">
        {listedEquipments.length > 0 ? (
          listedEquipments.map((equipment) => (
            <div key={equipment._id} className="col-md-4 mb-4">
              <div className="card equipment-card">
                <div className="card-body">
                  <h5 className="card-title">{equipment.name}</h5>
                  <p><strong>Type:</strong> {equipment.type}</p>
                  {/* <p><strong>Location:</strong> {equipment.location}</p> */}
                  <p><strong>Price per day:</strong> ${equipment.pricePerDay}</p>
                  <p>
                    <strong>Availability:</strong> 
                    {new Date(equipment.availability.startDate).toLocaleDateString()} - {new Date(equipment.availability.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No equipment uploaded.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
