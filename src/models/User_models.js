const mongoose = require('mongoose');
const validator = require('validator');
const schema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
}, email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Email is invalid');
        }
    }
}, password: {
    type: String,  
    required: true,
    trim: true,
    validate(value){
        if(value.length < 6){
            throw new Error('Password must be at least 6 characters');
        }
    }
},age:{
    type: Number,
    required: true,
    validate(value){
        if(value < 0){
            throw new Error('Age must be a positive number');
        }
    }
}
} );
const user_model = mongoose.model('Users', schema);

module.exports = user_model;