const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const routes = require('./routes/index');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use('/api/*', bodyParser.json());
app.use('/api/*', bodyParser.urlencoded({ extended: false }));

routes(app);

//route for imag

// const server =
// app.listen(port);
const server = http.createServer(app);

mongoose.connect('mongodb+srv://manoj:manoj123@cluster0.afc70.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useCreateIndex: true, useNewUrlParser: true });
//event Emiters
mongoose.connection.on('connected', () => {
  console.log('Database connected sucessfully');
});
mongoose.connection.on('disconnected', () => {
  console.log('database Disconnected');
  process.exit(0);
});
mongoose.connection.on('error', () => {
  console.log('database could not be connected');
  process.exit(1);
});
//checks ES Clustery
const port = process.env.port || 5000;
server.listen(port, () => {
  console.log('App is listening on port ' + port);
});
