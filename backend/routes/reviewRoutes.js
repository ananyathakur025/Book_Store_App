const express = require('express');
const Review = require('../models/Review');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Add Review
router.post('/', authenticate, async (req, res) => {
  try {
    const { isbn, review, rating } = req.body;
    const newReview = new Review({ isbn, review, rating, username: req.user.username });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: 'Error adding review' });
  }
});

// Get Reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ created_at: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});

module.exports = router;
