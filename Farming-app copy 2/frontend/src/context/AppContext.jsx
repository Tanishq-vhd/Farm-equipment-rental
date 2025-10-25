import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../url/baseUrl';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [equipmentList, setEquipmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableEquipments, setAvailableEquipmets] = useState([]);
  const [listedEquipments, setListedEquipmets] = useState([]);
  // Function to fetch user info (you can replace this with your own user fetching logic)
  const fetchUserInfo = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserInfo(user);
    }
  };

  // Function to fetch equipment list
  const fetchEquipmentList = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/equipment/`);
      setEquipmentList(data);
      console.log(data);
      
      // console.log("Equipments : ",equipmentList);
      
      const listedData = data.filter((equipment) => equipment.ownerId === userInfo._id);
      const availableData = data.filter((equipment) => equipment.ownerId !== userInfo._id);
      setAvailableEquipmets(availableData);
      setListedEquipmets(listedData);
      // console.log("Listed : ",listedEquipments);
      // console.log("Available :",availableEquipments);
      
      
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize user info and equipment list on mount
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Fetch equipment list whenever userInfo is available
  useEffect(() => {
    if (userInfo) {
        console.log("userInfo",userInfo);
        
      fetchEquipmentList();
    }
  }, [userInfo]);

  return (
    <AppContext.Provider
      value={{
        userInfo,
        setUserInfo,
        equipmentList,
        availableEquipments,
        listedEquipments,
        setEquipmentList,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Export the context to use in other components
export default AppContext;
