const express = require('express');

const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'All Products are here!'
    })
});

router.post('/',(req, res, next)=>{
    res.status(200).json({
        message:'Post operation of Product!'
    })
});

router.get('/:productId',(req, res, next)=>{
    res.status(200).json({
        message:'Fetch a Paticuler Product!',
        id: req.params.productId
    })
});

router.patch('/:productId',(req, res, next)=>{
    res.status(200).json({
        message:'patch a Paticuler Product!',
        id: req.params.productId
    })
});

router.delete('/:productId',(req, res, next)=>{
    res.status(200).json({
        message:'delete a Paticuler Product!',
        id: req.params.productId
    })
});


module.exports = router;