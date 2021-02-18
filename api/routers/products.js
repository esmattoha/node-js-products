const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');

const router = express.Router();

// Handle Get Request for Products
router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'All Products are here!',
                products: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

// Handle Post Request for Products
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
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
            res.status(500).json({
                error: err
            })
        })

});

// Handle Get Request for Product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Fetch a Paticuler Product!',
                product: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

// Handle Patch Request for Product
router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const upadateOps = {};
    for (const ops of req.body) {
        upadateOps[ops.propName] = ops.value;
    }
    Product.updateOne({ _id: id }, { $set: upadateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'patch a Paticuler Product!',
                product:result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });

});

// Handle Delete Request for Products
router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'delete a Paticuler Product!'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});


module.exports = router;