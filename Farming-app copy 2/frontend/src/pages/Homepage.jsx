import React, { useContext, useState } from 'react';
import EquipmentList from '../components/EquipmentList';
import UploadEquipment from '../components/UploadEquipment';
import ListedEquipments from '../components/ListedEquipments';
import AppContext from '../context/AppContext';
import './Homepage.css'; // Import the new CSS file
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo, availableEquipments, listedEquipments, setEquipmentList, isLoading } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleEquipmentSelect = (equipment) => {
    setSelectedEquipment(equipment);
    setActiveTab('update');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserInfo(null);
    setEquipmentList([]);
    navigate('/');
  }

  return (
    <div className="container mt-5">
      <div className="card w-96 mx-auto fade-in">
        <div className="card-header homepage">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 0 ? 'active' : ''}`} onClick={() => handleTabClick(0)}>
                Available Equipment
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 1 ? 'active' : ''}`} onClick={() => handleTabClick(1)}>
                Listed Equipments
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 2 ? 'active' : ''}`} onClick={() => handleTabClick(2)}>
                Upload Equipment
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {activeTab === 0 && (
            <EquipmentList isLoading={isLoading} user={userInfo} equipmentList={availableEquipments} onSelect={handleEquipmentSelect} />
          )}
          {activeTab === 1 && (
            <ListedEquipments isLoading={isLoading} equipmentList={listedEquipments} user={userInfo} equipment={selectedEquipment} />
          )}
          {activeTab === 2 && (
            <UploadEquipment user={userInfo} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
