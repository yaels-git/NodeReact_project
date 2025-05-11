const express=require('express')
const router=express.Router()
const managerJWT = require('../middleWare/managerJWT');
const verifyJWT=require("../middleWare/varifyJWT")


const apartmentController=require("../Controller/ApartmentController")

router.get("/",verifyJWT,apartmentController.getAllApartments)
router.get("/:id",verifyJWT,apartmentController.getApartmentById)
router.get("/user/:id",verifyJWT,apartmentController.getApartmentByUserId)
router.post("/",verifyJWT,apartmentController.createNewApartment)
router.post("/login",apartmentController.logInApartment)
router.put('/',verifyJWT,apartmentController.updateApartment)
router.delete('/delete',verifyJWT,apartmentController.deleteApartment)
router.put('/',verifyJWT,managerJWT,apartmentController.logInApartment)
router.put('/confirm',verifyJWT,managerJWT,apartmentController.ApartmentConfirm)

router.use(verifyJWT,managerJWT)



router.get('/protected', verifyJWT, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});

router.get('/manager-only', verifyJWT, managerJWT, (req, res) => {
    res.json({ message: `Hello Manager, ${req.user.name}` });
});

module.exports=router
