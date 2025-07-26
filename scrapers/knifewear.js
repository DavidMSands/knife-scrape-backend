// scrapers/knifewearJson.js
const axios = require('axios');

const scrapeKnifewearJpnKnives = async () => {
  const baseUrl = 'https://knifewear.com/en-us/collections/japanese-kitchen-knives/products.json';
  const allMap = new Map();
  const MAX_PAGES = 40;

  for (let page = 1; page <= MAX_PAGES; page++) {
    console.log(`Knifewear: fetching page ${page}...`);
    const url = `${baseUrl}?page=${page}`;

    let products;
    try {
      const resp = await axios.get(url);
      products = resp.data.products;
    } catch (err) {
      console.error(`Page ${page} failed: ${err.message}`);
      break;
    }

    if (!products || products.length === 0) break;

    for (const product of products) {
      const variant = product.variants?.[0] || {};
      const key = variant.sku || product.handle;
      if (allMap.has(key)) continue;

      allMap.set(key, {
        title: product.title,
        price: parseFloat(variant.price).toFixed(2),
        vendor: product.vendor,
        available: variant.available,
        link: `https://knifewear.com/products/${product.handle}`,
        image: product.images?.[0]?.src || null,
      });
    }
  }

  return Array.from(allMap.values());
};

module.exports = scrapeKnifewearJpnKnives;
