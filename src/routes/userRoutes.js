const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const jwtMiddleware=require("../middlewares/jwtMiddleware");
const bcryptMiddleware = require("../middlewares/bcryptMiddleware");

router.get('/', jwtMiddleware.verifyToken, jwtMiddleware.verifyAdmin, userController.getAllUsers);
router.get('/:userid', userController.getUserById);
router.post('/', userController.createNewUser);
router.put('/:userid', userController.updateUserById);
router.delete('/:userid', userController.deleteUserById);
// router.post("/login", userController.loginUser, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/login", userController.loginUser, bcryptMiddleware.comparePassword, jwtMiddleware.generateToken, jwtMiddleware.sendToken);
router.post("/register", userController.checkUsernameOrEmailExist, bcryptMiddleware.hashPassword, userController.registerUser);

module.exports = router;