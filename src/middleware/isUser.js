const jwt = require("../utils/jwt");

const isUser = (req, res, next) =>{
    try {
        const { token } = req.cookies;

        if(!token) return res.redirect("/login");

        const verify = jwt.verify(token);

        req.user = verify;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });   
    };
};

module.exports = isUser;