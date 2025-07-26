const express = require('express');
const router = express.Router();

const scrapeChefsEdge = require('../scrapers/chefsEdge');
const scrapeKnifewear = require('../scrapers/knifeWear');
const { isStrictKnifeMatch } = require('../utils/knifeUtils');

// POST /compare-link
router.post('/', async (req, res) => {
  const { link } = req.body;
  if (!link || typeof link !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid link' });
  }

  let company, scraper, allKnives, product;

  if (link.includes('chefs-edge.com')) {
    company = 'chefs-edge';
    scraper = scrapeChefsEdge;
  } else if (link.includes('knifewear.com')) {
    company = 'knifewear';
    scraper = scrapeKnifewear;
  } else {
    return res.status(400).json({ error: 'Unknown company in link' });
  }

  try {
    allKnives = await scraper();
    // Find the knife object by matching the link
    product = allKnives.find(k => k.link === link);
    if (!product) {
      return res.status(404).json({ error: 'Product not found for link' });
    }

    // Get the other company's knives
    let otherKnives = [];
    if (company === 'chefs-edge') {
      otherKnives = await scrapeKnifewear();
    } else {
      otherKnives = await scrapeChefsEdge();
    }

    // Find matches using compare logic
    const matches = otherKnives.filter(k => isStrictKnifeMatch(product, k));

    if (matches.length === 0) {
      return res.json({ product });
    } else {
      return res.json({ product, matches });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
