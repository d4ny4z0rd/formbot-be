const express = require("express");
const router = express.Router();
const {
	signup,
	login,
	updateUser,
	userDetails,
} = require("../controllers/user.controller");
const validateNewUser = require("../middlewares/newUser.middleware");
const validateLogin = require("../middlewares/login.middleware");
const validateUserUpdate = require("../middlewares/update.middleware");

router.post("/signup", validateNewUser, signup);
router.post("/login", validateLogin, login);
router.put("/updateuser/:userId", validateUserUpdate, updateUser);
router.get("/userdetails/:id", userDetails);

module.exports = router;
