const express = require('express');
const mongoose = require('mongoose');
const iosocket = require('socket.io')
const userRouter = require('./routes/userRoutes.js');
const userMessageRouter = require('./routes/userMessageRoutes.js')
const groupMessageRouter = require('./routes/groupMessageRoutes.js')
const SERVER_PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))

const DB_NAME = "db_comp3133_employee"
const DB_USER_NAME = 'nguyensteven578_db_user'
const DB_PASSWORD = 'KipuXKRBlZistryc' 
const CLUSTER_ID = 'qnimjux'
const DB_CONNECTION = `mongodb+srv://${DB_USER_NAME}:${DB_PASSWORD}@clustercomp3123.${CLUSTER_ID}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=clustercomp3123`

async function connectToMongoDB(connectionString = DB_CONNECTION) {
  await mongoose.connect(connectionString);
}

app.use(userRouter);
app.use(userMessageRouter);
app.use(groupMessageRouter);

const appServer = app.listen(SERVER_PORT, () => { 
  console.log('Server is running...') 
  try {
    connectToMongoDB(DB_CONNECTION);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

const ioServer = iosocket(appServer)


