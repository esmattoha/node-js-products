const express = require('express');
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

const router = express.Router();

// Handle Get Request for Ordered Products
router.get('/', (req, res, next) => {
    Order.find()
    .select('productId quantity _id ')
    .populate('productId', 'name')
        .exec()
        .then(docs => {
            res.status(200).json({
                message: 'All Orders are here!',
                orders: docs
                .map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.productId,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id
                        }
                    }
                })
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
    Product.findById({ _id: req.body.productId })
        .then(prod => {
            if(!prod){
                return res.status(404).json({
                    message:"product is not found!"
                })
            }
            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                productId: req.body.productId,
                quantity: req.body.quantity
            });
            return order.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Post operation of Order!',
                        createdOrder: {
                            _id: result._id,
                            product: result.productId,
                            quantity: result.quantity
                        },
                        order: {
                            request: {
                                type: "GET",
                                url: "http://localhost:3000/orders/" + result._id
                            }
                        }
                    })
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
    const orderId = req.params.orderId;
    Order.findById({ _id: orderId })
        .select("productId quantity _id")
        .populate('productId')
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'Fetch a Paticuler Ordered Product!',
                order: doc,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/orders/" + doc._id
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

});

// Handle Delete Request for Ordered Product
router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    Order.remove({ _id: orderId })
        .exec()
        .then(doc => {
            res.status(200).json({
                message: 'delete a Paticuler Ordered Product!',
                request:{
                    type:"POST",
                    url:"http://localhost:3000/orders"
                }
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