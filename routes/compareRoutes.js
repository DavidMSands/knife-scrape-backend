// routes/compareRoutes.js
const express = require('express');
const router = express.Router();

const { isStrictKnifeMatch } = require('../utils/knifeUtils');

const scrapeChefsEdge = require('../scrapers/chefsEdge');
const scrapeKnifewear = require('../scrapers/knifeWear');

router.get('/', async (req, res) => {
  const chefsEdgeData = await scrapeChefsEdge();
  const knifewearData = await scrapeKnifewear();

  const matches = [];
  for (const ceKnife of chefsEdgeData) {
    for (const kwKnife of knifewearData) {
      if (isStrictKnifeMatch(ceKnife, kwKnife)) {
        matches.push({ ceKnife, kwKnife });
      }
    }
  }
  res.json(matches);
});

module.exports = router;
