const mongoose = require('mongoose');

// defined schema structure for menu
const menuSchema = new mongoose.Schema({
    itemname:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    category:{
        type: String,
        enum: ['Veg','Non Veg'],
        required:true
    },
    taste:{
        type:String,
        enum: ['Sweet', 'Sour','Spicy','Salty'],
        required:true
    },
    isdrink:{
        type:Boolean,
        default: false
    },
    ingredients:{
        type:[String],
        default: []
    }    
});

const Menu =  mongoose.model('Menu', menuSchema);
module.exports = Menu;