const express = require('express');
const mongoose = require('mongoose');

const Order = require('../models/order');

const router = express.Router();

// Handle Get Request for Ordered Products
router.get('/', (req, res, next) => {
    Order.find()
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'All Orders are here!',
                orders:docs
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

// Handle Post Request for Ordered Products
router.post('/', (req, res, next) => {
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    order.save()
        .then(ressult => {
            res.status(201).json({
                message: 'Post operation of Order!',
                order: ressult
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

// Handle Get Request for Ordered Product
router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Fetch a Paticuler Ordered Product!',
        id: req.params.orderId
    })
});

// Handle Delete Request for Ordered Product
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'delete a Paticuler Ordered Product!',
        id: req.params.productId
    })
});


module.exports = router;