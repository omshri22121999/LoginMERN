import mongoose from 'mongoose'

const User = require('../models/user');

exports.user_signup = (req,res,next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    });
    user.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "User Created"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
};

exports.user_login = (req,res,next) => {
        User.find({username:req.body.username})
        .exec()
        .then(user =>{
            if(user.length>=1 && user[0].password===req.body.password){
                res.status(200).json({
                    message:"User Exists"
                })
            }
            else res.status(401).json({
                message:"Authentication Failed"
            })
        })
        .catch(err =>{
            res.status(500).json({
              error:err
            })
        })

};