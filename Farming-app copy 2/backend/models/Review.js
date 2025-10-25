const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' },
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  review: String,
});

module.exports = mongoose.model('Review', reviewSchema);
