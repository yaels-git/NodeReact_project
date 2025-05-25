const User = require("../Modules/User")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body
    console.log(username, password);
    if (!username || !password)
        return res.status(400).json({ message: 'All fields are required' })
    const foundUser = await User.findOne({ username }).lean()
    
    if (!foundUser )
        return res.status(401).json({ message: 'Unauthorized' })
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match)
        return res.status(401).json({ message: 'Unauthorized' })
    // res.send("Looged in")
    const userInfo = {
        _id: foundUser._id,
        name: foundUser.name,
        roles: foundUser.roles,
        phone:foundUser.phone,
        username: foundUser.username,
        email: foundUser.email
    };
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken,user:userInfo ,role: foundUser.roles})


}
const register = async (req, res) => {
    const { name, username, password, phone, email } = req.body
    console.log( name, username, password, phone, email);

    if (!name || !username || !password || !phone || !email)
        return res.status(400).json({ message: 'name,phone,mail,password are required' })
    
    // בדיקת כפילות
    const duplicate = await User.findOne({ username: username }).lean()
    if (duplicate) {
        return res.status(409).json({ message: 'Username or email already existse' })
    }

    // הצפנת סיסמה
    const hashedPwd = await bcrypt.hash(password, 10)//salt rounds
    const userObject = { name, username, password: hashedPwd, phone, email }
    console.log(userObject);
    // יצירת משתמש חדש
    const user = await User.create(userObject)
    if (user) {
        return res.status(201).json({ message: `new user${user.username} created` })
    } else {
        return res.status(400).json({ message: 'invalid user received' })

    }
}

module.exports = { login, register }