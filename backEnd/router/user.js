const userControllers = require('../controllers/user')
const passport = require('passport')
const express = require('express');
const router = express();

// Para quando eu for fazer o cloud
// const multer = require('multer');
// const { storage } = require('../cloud/config')
// const upload = multer({ storage })




// router.get('/register', userControll.scrennRegister)
router.post('/register', userControllers.new);
// router.get('/login', userControll.screenLogin);

passport.serializeUser(userControllers.valid);
passport.deserializeUser(userControllers.valid);

passport.use(userControllers.passwordValid);
router.post('/login', userControllers.login);
router.get('/logout', userControllers.logout);


module.exports = router