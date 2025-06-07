const userModel = require("../models/userModel");

var userController = {
    getAllUsers: (req, res, next) => {
        userModel.selectAllUsers((err, results, fields) => {
            if (err) {
                console.error("Error readAllUser:", err);
                res.status(500).json(err);
            }
            else res.status(200).json(results);
        });
    },
    getUserById: (req, res, next) => {
        userModel.selectUserById(req.params, (err, results, fields) => {
            if (err) {
                console.error("Error readUserById:", err);
                res.status(500).json(err);
            } else {
                if (results.length == 0) {
                    res.status(404).json({ message: "User not found" });
                }
                else res.status(200).json(results[0]);
            }
        });
    },
    createNewUser: (req, res, next) => {
        userModel.insertNewUser(req.body, (err, results, fields) => {
            if (err) {
                console.error("Error createNewUser:", err);
                res.status(500).json(err);
            }
            else res.status(201).json(results);
        });
    }, 
    updateUserById: (req, res, next) => {
        userModel.updateUserById(req.body, (err, results, fields) => {
            if (err) {
                console.error("Error updateUserById:", err);
                res.status(500).json(err);
            }
            else {
                if (results.affectedRows == 0) {
                    res.status(404).json({ message: "User not found" });
                }
                else res.status(204).send();
            }
        });
    },
    deleteUserById: (req, res, next) => {
        userModel.deleteUserById(req.params, (err, results, fields) => {
            if (err) {
                console.error("Error deleteUserById:", err);
                res.status(500).json(err);
            }
            else {
                if (results.affectedRows == 0) {
                    res.status(404).json({ message: "User not found" });
                }
                else res.status(200).send({ message: "User deleted" });
            }
        });
    },
    loginUser: (req, res, next) => {
        const data = {
            email: req.body.email,
            password: req.body.password
        };
        userModel.loginUser(data, (err, results, fields) => {
            if (err) {
                console.error("Error Login:", err);
                res.status(500).json(err);
            } else {
                if (results.length == 0) {
                    res.status(404).json({ message: "Invalid email or password" });
                } else {
                    res.locals.userid = results[0].userid;//saves userid from database in res.locals for use in jwt payload
                    res.locals.hashedPassword = results[0].password; // saves hashed password for bcrypt comparison
                    res.locals.role = results[0].role;  //saves role from database in res.locals for use in jwt payload
                    next();
                }
            }
        });
    },
    checkUsernameOrEmailExist: (req, res, next) => {
        userModel.checkUsernameOrEmailExist(req.body, (err, results, fields) => {
            if (err) {
                console.error("Error checkUsernameOrEmailExist:", err);
                res.status(500).json(err);
            } else {
                if (results.length > 0) {
                    res.status(409).json({ message: "Username or email already exists" });
                } else {
                    next();
                }
            }
        });
    },
    registerUser: (req, res, next) => {
        const data = {
            username: req.body.username,
            password: res.locals.hashedPassword, // hashed password from bcryptMiddleware
            role: req.body.role || 'Member', // default role is 'Member'
            email: req.body.email
        };
        userModel.register(data, (err, results, fields) => {
            if (err) {
                console.error("Error register:", err);
                res.status(500).json(err);
            } else {
                res.status(200).json({
                    message: "User "+ data.username +" registered successfully"
                });
            }
        });
    }
}

module.exports = userController;