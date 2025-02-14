const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  isbn: String,
  description: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Book', bookSchema);
