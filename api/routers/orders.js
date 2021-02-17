const express = require('express');

const router = express.Router();

// Handle Get Request for Ordered Products
router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'All Orders are here!'
    })
});

// Handle Post Request for Ordered Products
router.post('/',(req, res, next)=>{
    const Order = {
        productId : req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message:'Post operation of Order!',
        order: Order
    })
});

// Handle Get Request for Ordered Product
router.get('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message:'Fetch a Paticuler Ordered Product!',
        id: req.params.orderId
    })
});

// Handle Delete Request for Ordered Product
router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message:'delete a Paticuler Ordered Product!',
        id: req.params.productId
    })
});


module.exports = router;