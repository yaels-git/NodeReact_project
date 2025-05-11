const mongoose=require('mongoose')

const connctDB=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(err){
        console.error("****error connection to DB****\n"+err)
    }
}

module.exports=connctDB