const mongoose = require('mongoose');


const EquipmentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  availability: {
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
  },
  // coordinates: { 
  //     latitude: { type: Number, required: true },
  //     longitude: { type: Number, required: true },
  // },
      coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: true,
    },
},
{
  timestamps: true,
}

);

module.exports = mongoose.model('Equipment', EquipmentSchema);