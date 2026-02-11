const express = require('express');
const groupMessageModel = require('../models/group_message.js');
const app = express();

app.post('/groupMessage', async (req, res) => {
  
    console.log(req.body)
    const groupMessage = new groupMessageModel(req.body);
    
    try {
      await groupMessage.save();
      res.status(201).send(groupMessage);
    } catch (err) {
      res.status(500).send(err);
    }
  });

module.exports = app;
