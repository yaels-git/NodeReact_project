const mongoose=require('mongoose')
const payment=mongoose.Schema({
    
},{timstamps:true})

module.export=mongoose.model('Payment',payment)