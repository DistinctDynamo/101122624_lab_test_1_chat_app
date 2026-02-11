const express = require('express');
const userMessageModel = require('../models/user_message.js');
const app = express();

app.post('/userMessage', async (req, res) => {
  
    console.log(req.body)
    const userMessage = new userMessageModel(req.body);
    
    try {
      await userMessage.save();
      res.status(201).send(userMessage);
    } catch (err) {
      res.status(500).send(err);
    }
  });
