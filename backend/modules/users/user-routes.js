const express = require('express');
const router = express.Router();

const usersController = require('./user-controller')


router.post('/signin', usersController.signinWithEmailAndPassword)
router.post('/signup', usersController.signUpWithDetails)
module.exports = router;