//MongoDB password: 5813281
//MongoDB CONNECTION: mongodb+srv://PatriciaAllande:<password>@cluster1.6cvktgb.mongodb.net/?retryWrites=true&w=majority

// EXPRESS: npm init npm install express
// MONGODB: npm install mongoose
// NODEMON: permission error: sudo npm install -g nodemon


const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user');
const app = express();

const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://PatriciaAllande:5813281@cluster1.6cvktgb.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
  
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/auth', userRoutes);


app.use((req, res) => {
  res.json({ message: 'Your request was successful!' }); 
});

module.exports = app;