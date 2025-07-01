const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/foodData', async (req, res) => {
  try {
    const food_items = await mongoose.connection.db.collection('food_items').find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection('foodCategory').find({}).toArray();
    return res.status(200).json([food_items, foodCategory]);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;