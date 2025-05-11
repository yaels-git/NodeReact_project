const MyApartment=require("../Modules/MyApartments")

const createNewMyApartments=async(req,res)=>{
    const {city,neighborhood,street,building}=req.body
    if(!city||!street||!building)
        return res.status(201).json({message:'new myApartment created'})
    const myApartment =await MyApartment.create({city,neighborhood,street,building})
    if(myApartment){
        return res.status(201).json({message:'new myApartment created'})
    }else{
        return res.status(400).json({message:'invalid myApartment'})
    }
}
const getAllMyApartmentes=async(req,res)=>{
    const myApartmentes=await MyApartment.find().lean()
    if(!myApartmentes?.length){
        return res.status(400).json({message:'No myApartmentes found'})
    }
    res.json(myApartmentes)
}
const updateMyApartment=async(req,res)=>{
    const {city,neighborhood,street,building}=req.body
    if(!_id||!(city||neighborhood||street||building))
        return res.status(400).json({message:'feild is required'})
    const myApartment=await MyApartment.findById(_id).exec()
    if(!myApartment)
        return res.status(400).json({message:'myApartment not fount'})
    myApartment.city=city
    myApartment.neighborhood=neighborhood
    myApartment.street=street
    myApartment.building=building
    const updatedMyApartment=await myApartment.save()
    res.json(`'${updatedMyApartment.city} 'updated`)
}
const deleteMyApartment=async (req,res)=>{
    const{_id}=req.body
    const myApartment=await MyApartment.findById(_id).exec()
    if(!myApartment)
        return res.status(400).json({message:'myApartment not found'})
    const result=MyApartment.deleteOne()
    // res.json(`apartment` result)
}
const getMyApartmentById=async(req,res)=>{
    const{_id}=req.params
    const myApartment=await MyApartment.findById(_id)
    if(!myApartment)
        return res.status(400).json({message:'myApartment not found'})
    res.json(myApartment)
}


module.exports={createNewMyApartments,getAllMyApartmentes,getMyApartmentById,updateMyApartment,deleteMyApartment}