const express = require('express');
const Trade = require('../models/Trade');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

// Create Trade
router.post('/exchange', authenticate, async (req, res) => {
  try {
    const { wantedBooks, givenBooks } = req.body;

    if (wantedBooks.length !== givenBooks.length) {
      return res.status(400).json({ error: 'Wanted and given books must be equal' });
    }

    const trade = new Trade({ user: req.user._id, wantedBooks, givenBooks });

    await trade.save();
    res.status(201).json(trade);
  } catch (error) {
    res.status(400).json({ error: 'Error creating trade request' });
  }
});

// Get all trades
router.get('/trades', async (req, res) => {
  try {
    const trades = await Trade.find().populate('user', 'username').sort({ createdAt: -1 });
    res.json(trades);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching trades' });
  }
});

module.exports = router;
