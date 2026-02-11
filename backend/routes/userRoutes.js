const express = require('express');
const userModel = require('../models/user.js');
const app = express.Router();
const {query} = require('express-validator')

app.post('/user/signup', async (req, res) => {
  
    console.log(req.body)
    const user = new userModel(req.body);
    
    try {
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.post('/user/login',query('password').notEmpty(),async(req,res)=>{
    try {
        const user = await userModel.findOne({username: req.body.username}).select('+password');
        if (!user) {
            return res.status(404).send({
                message: "User not found " + req.body.username
            });
        }
        
        const isMatch = await user.isValidPassword(req.body.password);
        if (!isMatch) {
        throw new Error('Invalid password');
        }else{
            res.status(200).send({
                message: "Login successful"
            });
        }
        
    } catch (error) {
        if (error.kind === 'Invalid password') {
            return res.status(404).send({
                message: "User not found with id " + req.body._id
            });
        }
        res.status(500).send({
            message: "Invalid Password"
        });
    }
});

module.exports = app;
