const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Mock database
const ads = [
  { id: 1, category: 'shirt', title: 'Buy Shoes Now!', imageUrl: 'https://example.com/shoes.jpg' },
  { id: 2, category: 'laptop', title: 'Get Laptop Bags!', imageUrl: 'https://example.com/bags.jpg' },
  { id: 3, category: 'groceries', title: 'Kitchen Essentials Sale!', imageUrl: 'https://example.com/kitchen.jpg' },
];

// Ad matching logic
const adMappings = {
  shirt: ['shoes', 'accessories'],
  laptop: ['bags', 'external hard drives'],
  groceries: ['kitchen essentials'],
};

const getAdForCategory = (category) => {
  const relatedCategories = adMappings[category] || [];
  const filteredAds = ads.filter((ad) => relatedCategories.includes(ad.category));
  return filteredAds[Math.floor(Math.random() * filteredAds.length)]; // Random ad
};

// API endpoint
app.get('/ads', (req, res) => {
  const category = req.query.category;
  const ad = getAdForCategory(category);
  res.json(ad || { message: 'No ads found for this category.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});