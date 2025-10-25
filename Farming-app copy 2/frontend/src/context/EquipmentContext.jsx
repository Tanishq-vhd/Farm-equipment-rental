import React from 'react';
const EquipmentContext = React.createContext();

const EquipmentProvider = ({ children }) => {
  const [equipmentList, setEquipmentList] = useState([]);

  const updateEquipmentAvailability = (id, startDate, endDate) => {
    setEquipmentList((prevList) =>
      prevList.map((equipment) =>
        equipment._id === id ? { ...equipment, availability: { startDate, endDate } } : equipment
      )
    );
  };

  return (
    <EquipmentContext.Provider value={{ equipmentList, updateEquipmentAvailability }}>
      {children}
    </EquipmentContext.Provider>
  );
};

export { EquipmentContext, EquipmentProvider };
