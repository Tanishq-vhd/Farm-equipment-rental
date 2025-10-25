// Register.js

import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../url/baseUrl';
import './Register.css'; // Your existing CSS

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: {
      state: '',
      district: '',
      area: '',
      pincode: ''
    },
    contactInfo: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    setSuccess('');

    // Handle nested address fields
    if (name.includes('address.')) {
      const field = name.split('.')[1];
      setFormData((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Submit registration data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${baseUrl}/api/auth/register`, formData);

      localStorage.setItem('user', JSON.stringify(data));
      setSuccess(data.message || 'Registration successful!');
      setError('');
      alert('Registration successful!');
    } catch (err) {
      console.error('Registration Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container shadow-lg">
        <h2 className="register-title">Create an Account</h2>
        <form onSubmit={handleSubmit} className="register-form">
          {/* Show error message */}
          {error && <div className="alert alert-danger text-center">{error}</div>}
          {/* Show success message */}
          {success && <div className="alert alert-success text-center">{success}</div>}

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className="form-control"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="Enter your State"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">District</label>
            <input
              type="text"
              className="form-control"
              name="address.district"
              value={formData.address.district}
              onChange={handleChange}
              placeholder="Enter your District"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Area</label>
            <input
              type="text"
              className="form-control"
              name="address.area"
              value={formData.address.area}
              onChange={handleChange}
              placeholder="Enter your Area"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleChange}
              placeholder="Enter your Pincode"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contact Info</label>
            <input
              type="text"
              className="form-control"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              placeholder="Enter your contact information"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block w-100">
            Register
          </button>
        </form>

        <div className="register-footer mt-3 text-center">
          <p>
            Already have an account? <a href="/auth/login">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
