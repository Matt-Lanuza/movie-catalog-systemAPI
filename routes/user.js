const express = require('express');
const userController = require("../controllers/user");
const { verify } = require("../auth");


const router = express.Router();

/*Routes*/
// Register a User
router.post('/register', userController.registerUser);

// Login a User
router.post('/login', userController.loginUser);

// Get User's details
router.get('/details', verify, userController.getUserDetails);


module.exports = router;