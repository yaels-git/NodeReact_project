const mongoose=require('mongoose')
const myApartments=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    apartment:{
        type:mongoose.Schema.ObjectId,
        ref:'Apartment',
        required:true
    }
},{timstamps:true})
module.exports=mongoose.module('MyApartments',myApartments)