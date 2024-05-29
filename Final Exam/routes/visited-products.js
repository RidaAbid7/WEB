const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/visited-products', async (req, res) => {
    try {
        const visitedProductIds = req.session.visitedProducts || [];
        const visitedProducts = await Product.find({ _id: { $in: visitedProductIds } });
        res.render('visited-products', { visitedProducts });
    } catch (err) {
        console.error('Error fetching visited products:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;