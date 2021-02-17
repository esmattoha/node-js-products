const express = require('express');

const router = express.Router();

// Handle Get Request for Products
router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'All Products are here!'
    })
});

// Handle Post Request for Products
router.post('/',(req, res, next)=>{
    res.status(200).json({
        message:'Post operation of Product!'
    })
});

// Handle Get Request for Product
router.get('/:productId',(req, res, next)=>{
    res.status(200).json({
        message:'Fetch a Paticuler Product!',
        id: req.params.productId
    })
});

// Handle Patch Request for Product
router.patch('/:productId',(req, res, next)=>{
    res.status(200).json({
        message:'patch a Paticuler Product!',
        id: req.params.productId
    })
});

// Handle Delete Request for Products
router.delete('/:productId',(req, res, next)=>{
    res.status(200).json({
        message:'delete a Paticuler Product!',
        id: req.params.productId
    })
});


module.exports = router;