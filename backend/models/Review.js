const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  isbn: String,
  review: String,
  rating: Number,
  username: String,
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', reviewSchema);
