const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null , './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const upload = multer({storage: storage});


const router = express.Router();

// Handle Get Request for Products
router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
        .exec()
        .then(result => {
            const responce = {
                count: result.length,
                products:result.map(doc=>{
                    return{
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request:{
                            type:"GET",
                            url:"http://localhost:3000/products/" + doc._id  
                        }
                    }
                })
            }
            res.status(200).json({
                message: 'All Products are here!',
                product: responce
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
router.post('/', upload.single('productImage') ,(req, res, next) => {
    console.log(req.file);
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
                product: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request:{
                        type:"GET",
                        url: "http://localhost:3000/products/" + result._id
                    }
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

// Handle Get Request for Product
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id')
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Fetch a Paticuler Product!',
                product: result,
                request:{
                    type:"GET",
                    url:"http://localhost:3000/products/" + result._id
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
                product:{
                    type:"GET",
                    url:"http://localhost:3000/products/" + id
                }
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
                message: 'delete a Paticuler Product!',
                request:{
                    type:"POST",
                    url: "http://localhost:3000/products",
                    body:{
                        name:"String",
                        price:"Number"
                    }
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