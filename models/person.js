// Mongoose bridges the MongoDB database and Node.js application
const mongoose = require('mongoose');

//defined schema structure for person
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        enum: ['Chef','Waiter','Manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
    }
});

//Create Person model based on Schema
const Person = mongoose.model('Person', personSchema);

//Exporting our designed model to main file
module.exports = Person;