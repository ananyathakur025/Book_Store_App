const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

// Search books
router.get('/search', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});

module.exports = router;
