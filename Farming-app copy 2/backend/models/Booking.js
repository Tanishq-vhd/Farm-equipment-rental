const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['requested', 'approved', 'rejected', 'ongoing', 'completed'] },
  startDate: Date,
  endDate: Date,
  totalAmount: Number,
});

module.exports = mongoose.model('Booking', bookingSchema);
