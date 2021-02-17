const express = require('express');

const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message:'All Orders are here!'
    })
});

router.post('/',(req, res, next)=>{
    res.status(200).json({
        message:'Post operation of Order!'
    })
});

router.get('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message:'Fetch a Paticuler Ordered Product!',
        id: req.params.orderId
    })
});

router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message:'delete a Paticuler Ordered Product!',
        id: req.params.productId
    })
});


module.exports = router;