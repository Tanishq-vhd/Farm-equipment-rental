import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../url/baseUrl';
import moment from 'moment';
import Items from './Items';
import './EquipmentList.css';
import FilterEquipments from './FilterEquipments';
import AppContext from '../context/AppContext';

function EquipmentList() {
  const user = JSON.parse(localStorage.getItem('user'));
  const {availableEquipments} = useContext(AppContext)
  const [filteredEquipments, setFilteredEquipments] = useState(availableEquipments);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState([])
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    location: '',
    availableFrom: '',
    availableTo: '',
    minPrice: '',
    maxPrice: '',
    radius: '',
    // latitude: '',
    // longitude: ''
  });

  // Function to get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates([latitude,longitude]);
          setFilters((prev) => ({
            ...prev,
          }));
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Function to fetch filtered equipments from backend
  const fetchFilteredEquipments = async () => {
    setIsLoading(true);
    const { radius, ...otherFilters } = filters;
    
    // Only include coordinates and radius if they are actually set
    const params = {
      ...otherFilters,
      ...( radius && { latitude:coordinates.latitude, longitude:coordinates.longitude, radius })
    };
    if(radius) {
      try {
        const {data} = await axios.get(`${baseUrl}/api/equipment/filter`, { ownerId:user._id,params });
        setFilteredEquipments(data.filter((equi) => equi.ownerId !== user._id));
        // Apply local filtering on top of backend results
        // applyLocalFilters(response.data);
      } catch (error) {
        console.error("Error fetching filtered equipment:", error);
        // If backend fetch fails, fall back to local filtering
        // applyLocalFilters(initialEquipmentList);
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
    
  };

  // Function to apply local filters
  // const applyLocalFilters = (items) => {
  //   const filtered = items.filter((equipment) => {
  //     const { search, type, location, availableFrom, availableTo, minPrice, maxPrice, radius, latitude, longitude } = filters;
      
  //     const matchesName = equipment.name.toLowerCase().includes(search.toLowerCase());
  //     const matchesType = type ? equipment.type === type : true;
  //     const matchesLocation = location ? equipment.location.toLowerCase().includes(location.toLowerCase()) : true;
  //     const matchesPrice =
  //       (!minPrice || equipment.pricePerDay >= parseFloat(minPrice)) &&
  //       (!maxPrice || equipment.pricePerDay <= parseFloat(maxPrice));

  //     // Calculate distance using Haversine formula if radius is provided
  //     const calculateDistance = (lat1, lon1, lat2, lon2) => {
  //       const R = 6371; // Radius of Earth in km
  //       const dLat = (lat2 - lat1) * Math.PI / 180;
  //       const dLon = (lon2 - lon1) * Math.PI / 180;
  //       const a = 
  //         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //         Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
  //         Math.sin(dLon / 2) * Math.sin(dLon / 2);
  //       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //       return R * c; // Distance in km
  //     };

  //     const isWithinRadius = () => {
  //       if (latitude && longitude && radius && equipment.coordinates) {
  //         const distance = calculateDistance(
  //           latitude,
  //           longitude,
  //           equipment.coordinates.latitude,
  //           equipment.coordinates.longitude
  //         );
  //         return distance <= parseFloat(radius);
  //       }
  //       return true;
  //     };

  //     return matchesName && matchesType && matchesLocation && matchesPrice && isWithinRadius();
  //   });
    
  //   setFilteredEquipments(filtered);
  // };

  // Initial location fetch
  useEffect(() => {
    getUserLocation();
  }, []);

  // Fetch from backend when primary filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchFilteredEquipments();
    }, 500); // Add debounce to prevent too many API calls

    return () => clearTimeout(debounceTimer);
  }, [filters.search, filters.type, filters.location, filters.radius]);

  // Apply local filters when secondary filters change
  // useEffect(() => {
  //   applyLocalFilters(equipmentList);
  // }, [filters.minPrice, filters.maxPrice, filters.availableFrom, filters.availableTo]);

  return (
    <>
      <FilterEquipments filters={filters} handleFilterChange={handleFilterChange} />
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="row equip-container justify-content-start">
          {filteredEquipments.length > 0 ? (
            filteredEquipments.map((equipment, index) => (
              <div
                key={equipment._id || index}
                className="col-md-4 col-sm-6 mb-4 animated-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Items user={user} equipment={equipment} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">No items are available</div>
          )}
        </div>
      )}
    </>
  );
}

export default EquipmentList;