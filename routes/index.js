// routes/index.js
const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const sequelize = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.json({ companies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, pros, cons, rating } = req.body;
    await Company.create({ name, pros, cons, rating });
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const companyName = req.query.name;
    const companyReviews = await Company.findAll({ where: { name: companyName } });
    const averageRating = await Company.findAll({
      attributes: [[sequelize.fn('AVG', sequelize.col('rating')), 'avgRating']],
      where: { name: companyName },
    });
    res.json({ companyReviews, averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

