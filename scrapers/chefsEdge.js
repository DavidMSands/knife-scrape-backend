const axios = require('axios');

const scrapeChefsEdgeFromJson = async () => {
  const baseUrl = 'https://www.chefs-edge.com/collections/japanese-chef-knives/products.json';
  const allKnivesMap = new Map();
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get(`${baseUrl}?page=${page}`);
    const products = response.data.products;

    for (const product of products) {
      const variant = product.variants?.[0] || {};
      const uniqueKey = variant.sku || product.handle;

      // Only add if it hasn’t been added before
      if (!allKnivesMap.has(uniqueKey)) {
        allKnivesMap.set(uniqueKey, {
          title: product.title,
          price: variant.price, 
          vendor: product.vendor,
          link: `https://www.chefs-edge.com/products/${product.handle}`,
          image: product.images?.[0]?.src || null,
          available: variant.available,
        });
      }
    }

    page++;
    hasMore = products.length > 0;
  }

  return Array.from(allKnivesMap.values());
};

module.exports = scrapeChefsEdgeFromJson;
