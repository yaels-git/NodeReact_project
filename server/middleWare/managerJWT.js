const jwt = require('jsonwebtoken');
const managerJWT = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userRole = req.user.roles;
    if (userRole !== 'Manager') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next()

}
module.exports = managerJWT;
    