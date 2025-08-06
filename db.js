const mongoose = require('mongoose');
require('dotenv').config();

///const mongoURL = process.env.MONGODB_URL_LOCAL;
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
  console.log('Database connection successful');
});

db.on('error', (error) => {
  console.error('Database connection error:', error);
});

db.on('disconnected', () => {
  console.log('Database disconnected');
});

module.exports = db;