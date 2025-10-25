const Booking = require('../models/Booking');
const Equipment = require('../models/Equipment');

exports.getAllEquipments = async(req,res) => {
  try {
    const data = await Equipment.find({});
    // console.log(data);
    
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch equipment');
  }
}

exports.rentEquipment = async (req,res) => {
  const equipmentId = req.params.equipmentId;
  const equipment = req.body;
  equipment.equipmentId = equipmentId;

  try {
    const result = await Booking.create(equipment);
    console.log(result);
    
    res.status(201).json({message:'Booking done'})
  } catch (error) {
    res.status(400).json({message:error.message});
  }
  
}

exports.updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { startDate, endDate } = req.body;

  try {
    const equipment = await Equipment.findById(id);
    if (!equipment) {
      return res.status(404).json({ message: 'Equipment not found' });
    }

    // Update the equipment availability
    equipment.availability = {
      startDate,
      endDate,
    };
    await equipment.save();

    res.status(200).json(equipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

  exports.uploadEquipment = async (req, res) => {
      try {
          const { ownerId, name, description, type, location, pricePerDay, availableFrom, availableTo, coordinates} = req.body;
          console.log(coordinates);
          
          const equipment = await Equipment.create({
              ownerId,
              name,
              description,
              type,
              location,
              pricePerDay,
              availability: { startDate: availableFrom, endDate: availableTo },
              // coordinates: {
              //     longitude,
              //     latitude
              // },
              coordinates:coordinates.coordinates,
          });
          console.log(equipment);
          
          res.status(201).json({ message: 'Equipment uploaded successfully!', equipment });
      } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Error uploading equipment', error: error.message });
      }
  };


exports.filterEquipments = async (req, res) => {
  const { radius, latitude, longitude } = req.query;

  let query = {};
  if (radius && latitude && longitude) {
    query = {
      coordinates: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(longitude), parseFloat(latitude)],
            parseFloat(radius) / 6378.1 // Convert km to radians
          ]
        }
      }
    };
  }
  // console.log(query);
  
  try {
    const equipments = await Equipment.find(query);
    // console.log("Equi " , equipments);
    
    res.status(200).json(equipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

