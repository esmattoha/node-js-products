const express = require('express');
const morgan = require('morgan');

const ProductsApi = require('./api/routers/products');
const OrdersApi = require('./api/routers/orders');

const app = express();


app.use(morgan('dev'));

// Routes which handle request 
app.use('/products', ProductsApi);
app.use('/orders', OrdersApi);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404 ;
    next(error); 
})
app.use((req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app;