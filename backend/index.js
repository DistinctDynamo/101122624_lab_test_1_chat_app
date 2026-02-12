const express = require('express');
const mongoose = require('mongoose');
const iosocket = require('socket.io')
const userRouter = require('./routes/userRoutes.js');
const userMessageRouter = require('./routes/userMessageRoutes.js')
const groupMessageRouter = require('./routes/groupMessageRoutes.js')
const SERVER_PORT = 3133;

const app = express();

app.use(express.json()); 
//app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  console.log(`Server ${SERVER_PORT} is running...`) 
  try {
    connectToMongoDB(DB_CONNECTION);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
});

app.get('/', (req, res) => {
    res.send("<h1>Steven Nguyen 101122624 COMP3133 Lab Test 1</h1>");
});

const ioServer = iosocket(appServer)
ioServer.on('connection',(socket)=>{

  socket.on('join-group',(data)=>{
    const msg = `Client ${socket.id} joined group ${groupName}`
    console.log(msg)

    ioServer.to(groupName).emit('group-ack', msg)
  })

  socket.on('message',(data)=>{
    console.log('Message received from client:', data)
    socket.emit('message-ack', "Hello from the Server")
  })

  socket.on('leave-group', (groupName) => {
        socket.leave(groupName)
        const msg = `Client ${socket.id} left group ${groupName}`
        console.log(msg)

        ioServer.to(groupName).emit('group-ack', msg)
  })

  socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id)
    })
  
})

