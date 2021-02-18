const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const ProductsApi = require('./api/routers/products');
const OrdersApi = require('./api/routers/orders');

const app = express();


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method === 'OPTION'){
        res.header("Access-Control-Allow-Methods",'PUT, PATCH, POST, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

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