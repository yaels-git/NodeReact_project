const Apartment = require('../Modules/Apartment')
const User = require('../Modules/User')

const { populate } = require('../Modules/User')
const { createNewUser } = require("./UserController")

//הוספת דירה חדשה
const createNewApartment = async (req, res) => {
    const { user, city, neighborhood, street, building, floor, price, img, size, numOfRooms, airDirections, description, options } = req.body
    
    console.log(user, city, neighborhood, street, building, floor, price, size, numOfRooms, airDirections, description, options )
    if (!user || !city ||  !street || !building || !floor || !price || !size || !numOfRooms || !airDirections || !description || !options)
        return res.status(400).json({ message: 'Missing required fields' })


    const parsedUser = await User.findById({ _id: user._id })
    // const newUser = await createNewUser(parsedUser);
    if (!parsedUser)
        return res.status(400).send("User is not exists")
    
    const apartment = await Apartment.create({
        user:user._id,
        city,
        neighborhood,
        street,
        building,
        floor,
        price,
        img,
        size,
        numOfRooms,
        airDirections,
        description,
        options,
        isConfirm: false,
        purchaseConfirm: false
    });

    if (apartment) {
        return res.status(201).json({ message: 'new apartment created' })
    } else {
        return res.status(400).json({ message: 'invalid apartment' })
    }

}

const logInApartment = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ message: 'Apartment ID is required' });
    }
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
    apartment.isConfirm = true
    const updatedApartment = await apartment.save()
    res.json(`'${updatedApartment.user} 'updated`)
}
const ApartmentConfirm = async (req, res) => {
    const { _id } = req.body
    if (!_id) {
        return res.status(400).json({ message: 'Apartment ID is required' });
    }
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
    apartment.purchaseConfirm = true
    const updatedApartment = await apartment.save()
    res.json(`'${updatedApartment.user} 'updated`)
}




//תצוגת כל הדירות
const getAllApartments = async (req, res) => {
    const apartment = await Apartment.find({ isConfirm: true }).lean()
    if (!apartment?.length) {
        return res.status(400).json({ message: 'No apartment found' })
    }
    res.json(apartment)

}
const updateApartment = async (req, res) => {
    const { _id, user, city, neighborhood, street, building, floor, price, img, size, numOfRooms, airDirections, description, options } = req.body
    if (!_id || (!user || !city || !neighborhood || !street || !building || !floor || !price || !size || !numOfRooms || !airDirections || !description || !options))
        return res.status(400).json({ message: 'feild is required' })
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not fount' })
    
    // בדיקה אם המשתמש הוא הבעלים של הדירה
    if (apartment.user.toString() !== req.user._id) {
        return res.status(403).json({ message: 'You are not authorized to delete this apartment' });
    }
    apartment.user = user
    apartment.city = city
    apartment.neighborhood = neighborhood
    apartment.street = street
    apartment.building = building
    apartment.floor = floor
    apartment.price = price
    apartment.img = img
    apartment.size = size
    apartment.numOfRooms = numOfRooms
    apartment.airDirections = airDirections
    apartment.description = description
    apartment.options = options
    const updatedApartment = await apartment.save()
    res.json(`'${updatedApartment.user} 'updated`)
}
const deleteApartment = async (req, res) => {
    console.log("hhhh");
    const { _id } = req.body
    console.log(_id);
    if (!_id) {
        return res.status(400).json({ message: 'Apartment ID is required' });
    }

    console.log("hhhh");
    const apartment = await Apartment.findById(_id).exec()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
    console.log("hhhh");
    // if (apartment.user.toString() !== req.user._id && !(req.user.roles && req.user.roles.includes('Manager'))) {
    //     return res.status(403).json({ message: 'You are not authorized to delete this apartment' });
    // }
    await Apartment.deleteOne({ _id })
    res.json({ message: `Apartment '${_id}' deleted successfully` }); console.log("hhhh");
}
// const deleteApartment = async (req, res) => {
//     const { _id } = req.body
//     if (!_id) {
//         return res.status(400).json({ message: 'Apartment ID is required' });
//     }
//     // בדיקה אם הדירה קיימת
//     const apartment = await Apartment.findById(_id).exec()
//     if (!apartment)
//         return res.status(400).json({ message: 'apartment not found' })
    
//     if (apartment.user.toString() !== req.user._id) {
//         return res.status(403).json({ message: 'You are not authorized to delete this apartment' });
//     }
//     await Apartment.deleteOne({ _id })
//     res.json({ message: `Apartment '${_id}' deleted successfully` });
// }

//תצוגת הדירות רק שלי
const getApartmentByUserId = async (req, res) => {
    const { id } = req.params
    const apartment = await Apartment.find({ user: id }).lean()
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
    res.json(apartment)
}

//פרטי בעל הדירה
const getApartmentById = async (req, res) => {
    const { id } = req.params
    const apartment = await Apartment.find({ user: id })
        .populate('user')
        .lean();
    if (!apartment)
        return res.status(400).json({ message: 'apartment not found' })
    res.json(apartment)
}

module.exports = {
    createNewApartment,
    getApartmentById,
    getAllApartments,
    getApartmentByUserId,
    updateApartment,
    // deleteMyApartment,
    ApartmentConfirm,
    logInApartment,
    deleteApartment
}