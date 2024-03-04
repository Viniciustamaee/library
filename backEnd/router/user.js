const userControllers = require('../controllers/user');
const passport = require('passport');
const express = require('express');
const valid = require('../middleware')
const router = express();



passport.use('login', userControllers.passwordValid);
passport.deserializeUser(userControllers.valid);
passport.serializeUser(userControllers.valid);
passport.use('teste', userControllers.tokenValid);

router.post('/register', userControllers.new);

router.post('/login', userControllers.login);

router.get('/', userControllers.allUsers)

module.exports = router;
