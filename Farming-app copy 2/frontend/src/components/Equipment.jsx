// Equipment.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Equipment = () => {
    const [equipment, setEquipment] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        location: '',
        pricePerDay: '',
        availableFrom: '',
        availableTo: '',
        latitude: '',
        longitude: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // Fetch all equipment on component mount
        const fetchEquipment = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/equipment');
                setEquipment(response.data);
            } catch (error) {
                console.error('Error fetching equipment:', error);
            }
        };

        fetchEquipment();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post('http://localhost:3000/api/equipment/upload', formData);
            setSuccess(response.data.message);
            setFormData({
                name: '',
                type: '',
                location: '',
                pricePerDay: '',
                availableFrom: '',
                availableTo: '',
                latitude: '',
                longitude: ''
            });
            // Re-fetch equipment data after successful upload
            const equipmentResponse = await axios.get('http://localhost:3000/api/equipment');
            setEquipment(equipmentResponse.data);
        } catch (error) {
            console.error('Error uploading equipment:', error);
            setError(error.response?.data?.message || 'Error uploading equipment');
        }
    };

    return (
        <div>
            <h2>Upload Equipment</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} required />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
                <input type="number" name="pricePerDay" placeholder="Price per Day" value={formData.pricePerDay} onChange={handleChange} required />
                <input type="date" name="availableFrom" placeholder="Available From" value={formData.availableFrom} onChange={handleChange} required />
                <input type="date" name="availableTo" placeholder="Available To" value={formData.availableTo} onChange={handleChange} required />
                <input type="number" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} required />
                <input type="number" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} required />
                <button type="submit">Upload Equipment</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <h3>All Equipment</h3>
            <ul>
                {equipment.map((item, index) => (
                    <li key={index}>
                        {item.name} - {item.type} - {item.location} - ${item.pricePerDay}/day
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Equipment;
