const express = require('express');
const router = express.Router();

const signupRouter = require('./signup.js');

router.use('/signup', signupRouter);

module.exports = router;