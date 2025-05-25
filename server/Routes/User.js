const express=require('express')
const router=express.Router()
const verifyJWT=require("../middleWare/varifyJWT")
const managerJWT = require('../middleWare/managerJWT');

const {getAllUsers,getUserById,createNewUser,updateUser,deleteUser}=require("../Controller/UserController")


router.get("/",verifyJWT,getAllUsers)
router.get("/:_id",verifyJWT,getUserById)
router.post("/",createNewUser)
router.put("/",verifyJWT,updateUser)
router.delete("/",verifyJWT,deleteUser)
router.put("/complete/:id",verifyJWT,updateUser)



router.use(verifyJWT)


router.get('/protected', verifyJWT, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});

router.get('/manager-only', verifyJWT, managerJWT, (req, res) => {
    res.json({ message: `Hello Manager, ${req.user.name}` });
});


module.exports=router