require('dotenv').config();

// Setting up Express for creating a Server
const express = require('express');
const app = express();
// Importing the database connection
const db = require('./db');
// Importing passport for Authentication
const passport = require('passport');
// For username and password strategy
const LocalStrategy = require('passport-local').Strategy;

// Middleware to parse JSON requests
// Converts any kind of i/p data in JS Object format and stores it in ' req.body'
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//.json() is used because we are sending JSON data from Postman

const PORT = process.env.PORT || 3000;

// Middleware Functions

//1. Date and Time logging whenever hitting api
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}

app.use(logRequest);

// default home page
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to the Restaurant Management System');
});

// Importing routes for menu and person
// These routes will handle requests related to menu and person data
const menuroutes = require('./routes/menuroutes');
const personroutes = require('./routes/personroutes');

// Using the imported routes
// The routes will be prefixed with '/menu' and '/person'
app.use('/menu', menuroutes);
app.use('/person', personroutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

//https://hotelnodeserver.onrender.com