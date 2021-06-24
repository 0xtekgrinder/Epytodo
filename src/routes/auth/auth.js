const express = require('express');
const router = express.Router();
const authControllers = require('../../controllers/auth/auth');
const {verifyRegisterBody, verifyLoginBody} = require('../../middleware/middleware');

router.post("/register", verifyRegisterBody, authControllers.createUser);
router.post("/login", verifyLoginBody, authControllers.loginUser);

module.exports = router;