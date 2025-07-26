const express = require('express');
const router = express.Router();
const scrapeKnifewear = require('../scrapers/knifeWear');

router.get('/', async (req, res) => {
  try {
    const data = await scrapeKnifewear();
    res.json(data);
  } catch (err) {
    res.status(500).send('Failed scraping Knifewear');
  }
});

module.exports = router;
