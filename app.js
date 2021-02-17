const express = require('express');
const morgan = require('morgan');

const ProductsApi = require('./api/routers/products');
const OrdersApi = require('./api/routers/orders');

const app = express();


app.use(morgan('dev'));

// Routes which handle request 
app.use('/products', ProductsApi);
app.use('/orders', OrdersApi);

module.exports = app;