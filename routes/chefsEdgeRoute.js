const express = require('express');
const router = express.Router();
const scrapeChefsEdge = require('../scrapers/chefsEdge');

router.get('/', async (req, res) => {
  try {
    const data = await scrapeChefsEdge();
    res.json(data);
  } catch (err) {
    console.error('ChefsEdge route error:', err.message);
    res.status(500).send('Scraping failed');
  }
});

module.exports = router;
