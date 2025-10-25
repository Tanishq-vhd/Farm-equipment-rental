import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import baseUrl from '../url/baseUrl'
import AppContext from '../context/AppContext';

const UploadEquipment = () => {
    const {userInfo} = useContext(AppContext)
    const [equipment, setEquipment] = useState({
        ownerId:userInfo._id,
        name: '',
        description: '',
        type: '',
        location: '',
        pricePerDay: '',
        availableFrom: '',
        availableTo: '',
        imageUrl: '',
        coordinates: {
            latitude: null,
            longitude: null,
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Fetch user's current location
    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setEquipment((prev) => ({
                            ...prev,
                            coordinates: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                            },
                        }));
                    },
                    (error) => {
                        console.error("Error getting location: ", error);
                        setError('Could not retrieve your location. Please allow location access.');
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        fetchLocation();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEquipment((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear any previous error/success messages when user starts typing
        setError(null);
        setSuccess(false);
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        setIsLoading(false);
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }
            // Validate file size (e.g., max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }
            setEquipment((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
            setError(null);
        }
        setIsLoading(false);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Validate dates
        if (new Date(equipment.availableFrom) > new Date(equipment.availableTo)) {
            setError('Available From date must be before Available To date');
            return;
        }

        // Prepare the equipment data
        const equipmentData = {
            ...equipment,
            coordinates: {
                type: 'Point',
                coordinates: [
                    equipment.coordinates.longitude,
                    equipment.coordinates.latitude
                ]
            }
        };
        console.log(equipmentData);
        

        try {
            const {data} = await axios.post(`${baseUrl}/api/equipment/upload`, equipmentData);

            // if (data) {
            //     setSuccess(true);
            //     // Reset form
            //     setEquipment({
            //         name: '',
            //         description: '',
            //         type: '',
            //         location: '',
            //         pricePerDay: '',
            //         availableFrom: '',
            //         availableTo: '',
            //         imageUrl: '',
            //         coordinates: {
            //             latitude: equipment.coordinates.latitude,  // Keep the coordinates
            //             longitude: equipment.coordinates.longitude,
            //         },
            //     });
            // }
            console.log(data);
            
        } catch (error) {
            setError(error.response?.data?.message || 'Error uploading equipment. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Upload Equipment</h2>
            
            {/* Alert messages */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            {success && (
                <div className="alert alert-success" role="alert">
                    Equipment uploaded successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Equipment Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Enter equipment name"
                        value={equipment.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        placeholder="Enter equipment description"
                        value={equipment.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Type</label>
                    <input
                        type="text"
                        id="type"
                        name="type"
                        className="form-control"
                        placeholder="Enter equipment type"
                        value={equipment.type}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        placeholder="Enter location"
                        value={equipment.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="pricePerDay" className="form-label">Price Per Day</label>
                    <input
                        type="number"
                        id="pricePerDay"
                        name="pricePerDay"
                        className="form-control"
                        placeholder="Enter price per day"
                        value={equipment.pricePerDay}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                    />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="availableFrom" className="form-label">Available From</label>
                        <input
                            type="date"
                            id="availableFrom"
                            name="availableFrom"
                            className="form-control"
                            value={equipment.availableFrom}
                            onChange={handleChange}
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="availableTo" className="form-label">Available To</label>
                        <input
                            type="date"
                            id="availableTo"
                            name="availableTo"
                            className="form-control"
                            value={equipment.availableTo}
                            onChange={handleChange}
                            min={equipment.availableFrom || new Date().toISOString().split('T')[0]}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="imageUrl" className="form-label">Equipment Image</label>
                    <input
                        type="file"
                        id="imageUrl"
                        name="imageUrl"
                        className="form-control"
                        onChange={handleImageUpload}
                        accept="image/*"
                    />
                    {equipment.imageUrl && (
                        <div className="mt-2">
                            <img 
                                src={equipment.imageUrl} 
                                alt="Equipment preview" 
                                className="img-thumbnail" 
                                style={{ maxWidth: '200px' }} 
                            />
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label className="form-label">Location Coordinates</label>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="mb-1"><strong>Latitude:</strong> {equipment.coordinates.latitude || 'Fetching...'}</p>
                        </div>
                        <div className="col-md-6">
                            <p className="mb-1"><strong>Longitude:</strong> {equipment.coordinates.longitude || 'Fetching...'}</p>
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={isLoading}
                >
                    {isLoading ? 'Uploading...' : 'Upload Equipment'}
                </button>
            </form>
        </div>
    );
};
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data before submission:", formData);  // Log form data
  
    try {
      const response = await axios.post('/api/equipments/upload', formData);
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading equipment:", error);
      alert("Error uploading equipment. Please try again.");
    }
  };
  
export default UploadEquipment;