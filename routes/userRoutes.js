const express = require('express');
const router = express.Router();

const validateToken = require('../Middleware/validateTokenHandler');

const {
    registerUser,
    loginUser,
    currentUser
} = require('../Controller/userController');


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);


module.exports = router;