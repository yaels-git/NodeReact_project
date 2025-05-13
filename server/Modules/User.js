const mongoose = require('mongoose')
const jwt=require('jsonwebtoken')
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        // required: true,
        // lowercase: true,
        // trim: true
    },
    roles:{
        type:String,
        enum:['User','Manager'],
        default:'User'
    }
}, {
    timestamps: true
})
module.exports = mongoose.model('User', user)