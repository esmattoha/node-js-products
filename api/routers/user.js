const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

// router.post('/login', (req, res, next)=>{
//     User.find({email: req.body.email})
//     .exec()
//     .then(user =>{
//         bcrypt.compare(req.body.password, user[0].password), ((err, hash) => {
//             // result == true
//         });
        
//     })
// })

router.post('/signup', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(doc => {
            if (doc.length >= 1) {
                return res.status(409).json({
                    message: "Mail alredy exiest ! "
                });
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User Created!'
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                });
            }
        })

});

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User Deleted!"
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});



module.exports = router;