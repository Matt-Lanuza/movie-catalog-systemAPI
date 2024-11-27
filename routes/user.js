const express = require('express');
const userController = require("../controllers/user");


const router = express.Router();

/*Routes*/
// Register a User
router.post('/register', userController.registerUser);

// Login a User
router.post('/login', userController.loginUser);


module.exports = router;