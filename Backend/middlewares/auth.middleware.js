const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../models/blacklistToken.model.js'); // Use consistent naming

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Check if token is blacklisted
        const isBlacklisted = await blacklistTokenModel.findOne({ token }); // Correct model reference
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Attach user to the request object
        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};



module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
        const isBlacklisted = await BlackListToken.findOne({ token: token });

        if (isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await require('../models/captain.model').findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized: Captain not found' });
        }

        // Attach captain to the request object
        req.captain = captain;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        res.status(401).json({ message: 'Unauthorized' });
    }
};

