import React from 'react';
import './EquipmentList.css';

const FilterEquipments = ({ filters, handleFilterChange }) => {
  return (
    <div className="container mt-3 page-container mb-3">
      <div className="filter-section card p-4 shadow-sm">
        <h5 className="mb-4">Filter Equipment</h5>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="search"
              placeholder="Search by name"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="type"
              placeholder="Filter by type"
              value={filters.type}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Filter by location"
              value={filters.location}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="availableFrom"
              value={filters.availableFrom}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control"
              name="availableTo"
              value={filters.availableTo}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              name="radius"
              placeholder="Radius (km)"
              value={filters.radius}
              onChange={handleFilterChange}
            />
          </div>
          {/* <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              name="latitude"
              placeholder="Your Latitude"
              value={filters.latitude}
              onChange={handleFilterChange}
            />
          </div>
          <div className="col-md-3">
            <input
              type="number"
              className="form-control"
              name="longitude"
              placeholder="Your Longitude"
              value={filters.longitude}
              onChange={handleFilterChange}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default FilterEquipments;
