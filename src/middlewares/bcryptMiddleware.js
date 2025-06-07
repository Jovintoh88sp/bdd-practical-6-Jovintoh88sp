const bcrypt = require("bcrypt");

const saltRounds = 10;

var bcryptMiddleware = {
    comparePassword: (req, res, next) => {
        // Check password
        const callback = (err, isMatch) => {
            if (err) {
                console.error("Error bcrypt:", err);
                res.status(500).json(err);
            } else {
                if (isMatch) {
                    next();
                } else {
                    res.status(404).json({
                        message: "Invalid email or password",
                    });
                }
            }
        };
        bcrypt.compare(req.body.password, res.locals.hashedPassword, callback);
    },
    hashPassword: (req, res, next) => {
        const callback = (err, hash) => {
            if (err) {
                console.error("Error bcrypt:", err);
                res.status(500).json(err);
            } else {
                res.locals.hashedPassword = hash;
                next();
            }
        };
        bcrypt.hash(req.body.password, saltRounds, callback);
    }
}

module.exports=bcryptMiddleware;