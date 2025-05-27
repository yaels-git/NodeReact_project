const express = require('express');
const router = express.Router();
const verifyJWT=require("../middleWare/varifyJWT")

const MyApartment = require('../Controller/MyAparymentsController');

// יצירת דירה חדשה
router.post('/',verifyJWT, MyApartment.createMyApartment);

// קבלת כל הדירות
router.get('/',MyApartment.getAllMyApartments);

// קבלת דירה לפי מזהה (id)
 router.get('/:id', MyApartment.getAllMyApartmentsId);

// עדכון דירה
//router.put('/', MyApartment.updateMyApartment);

// מחיקת דירה
router.delete('/:id',verifyJWT, MyApartment.deleteMyApartment);

router.use(verifyJWT)

router.get('/protected', verifyJWT, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});

module.exports = router;