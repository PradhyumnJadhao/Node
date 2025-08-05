const mongoose = require('mongoose');
const mongoURL = 'mongodb://localhost:27017';

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