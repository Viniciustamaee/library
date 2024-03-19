const userControllers = require('../controllers/user');
const passport = require('passport');
const express = require('express');
const router = express();

const { storage } = require('../cloudinary/cloud')
const multer = require('multer')
const upload = multer({ storage })

passport.use('login', userControllers.passwordValid);
passport.deserializeUser(userControllers.valid);
passport.serializeUser(userControllers.valid);
passport.use('protect', userControllers.tokenValid);

router.get('/', userControllers.allUsers)
router.put('/Perfil/:id/edit', upload.single('img'), userControllers.update)
router.post('/register', upload.single('img'), userControllers.new);
router.post('/login', userControllers.login);
router.get('/:id', userControllers.oneUser)

module.exports = router;
