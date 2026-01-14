const jwt = require('jsonwebtoken');
const Login = require('../models/Login');

const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: 'Please login first', success : false});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Login.findById(decoded.id).select('-password');

        req.user = user;
        next();
    } catch (error) {
         return res.status(401).json({ message: "Session expired. Please login again", success : false });
    }
}

module.exports = protect;