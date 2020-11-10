const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const User = require("../models/user");
const jwt = require('jsonwebtoken');

const { success, error, validation } = require("../helpers/responseApi");
exports.user_singup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length > 0) {
                return res.status(409).json(error("User already exists", res.statusCode));
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json(error("Something went wrong", res.statusCode));
                    }
                    else {
                        const user = new User({
                            
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(doc => {
                                res.status(201).json(success("User created",doc,res.statusCode));
                            })
                            .catch(error => {
                                res.status(500).json(error("Something went wrong", res.statusCode))
                            });
                    }

                });
            }
        })
}


  exports.user_login = (req,res,next)=> {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) 
        {
          return res.status(404).json(error("Unauthorised attempt", res.statusCode));
        }
         bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                 return res.status(401).json(error("Unauthorised attempt", res.statusCode));
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                    )

                    return res.status(200).json(success("OK",token,res.statusCode));
                }
                return res.status(401).json(error("Unauthorised attempt", res.statusCode));
            });
         
       })
    .catch(err => {
        res.status(500).json(error("Something went wrong", res.statusCode));
    });
  }

  

  exports.user_delete = (req, res, next)=>{
    User.remove({_id:req.params.userId})
    .exec()
    .then((doc) => {
        if (doc.deletedCount > 0) {
          res.status(200).json(success("User Deleted",doc,res.statusCode));
        } else {
          res.status(404).json(error("Not found", res.statusCode));
        }
      })
    .catch(err => {
        res.status(500).json(error("Something went wrong", res.statusCode));
    });

  };