const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const featuredProducts = await Product.find({ isFeatured: true }).limit(5);
        res.render('homepage', { featuredProducts });
    } catch (err) {
        console.error('Error fetching featured products:', err);
        res.render('homepage', { featuredProducts: [] });
    }
});

module.exports = router;