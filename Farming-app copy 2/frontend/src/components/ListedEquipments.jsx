import React, { useState } from 'react'
import Items from './Items'
import './EquipmentList.css'
const ListedEquipments = ({user, equipmentList,isLoading}) => {
  return (
    <>
      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="row equip-container justify-content-start">
          {equipmentList.length > 0 ? (
            equipmentList.map((equipment, index) => (
              <div
                key={index}
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
  )
}

export default ListedEquipments