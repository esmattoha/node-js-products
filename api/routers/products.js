const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');

const router = express.Router();

// Handle Get Request for Products
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All Products are here!'
    })
});

// Handle Post Request for Products
router.post('/', (req, res, next) => {
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Post operation of Product!',
                product: product
            })
        })
        .catch(err => {
            console.log(err);
        })

});

// Handle Get Request for Product
router.get('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Fetch a Paticuler Product!',
        id: req.params.productId
    })
});

// Handle Patch Request for Product
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'patch a Paticuler Product!',
        id: req.params.productId
    })
});

// Handle Delete Request for Products
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'delete a Paticuler Product!',
        id: req.params.productId
    })
});


module.exports = router;