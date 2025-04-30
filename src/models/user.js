const validate = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength: 6,
        required: true,
    },
    lastName: {
        type: String,
        minLength: 6,
        required: true,
    },
    email: {
        type: String,
        lowerCase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validate.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        minLength: 8,
        maxLength: 15,
        required: true,
    },
    gender: {
        type: String,
        validate(value){
            if(!['male','female','other'].includes(value)){
                throw new Error('Gender data is not correct')
            }
        }
    },
    age: {
        type: Number,
        minLength: 18
    },
    photoUrl: {
        type: String,
        validate(value){
            if(!validate.isURL(value)){
                throw new Error('Photo URL is not valid')
            }
        }
    },
    about:{
        type: String,
        default: 'user has no description'
    },
    skills: {
        type: [String]
    }
},
{
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = { User }