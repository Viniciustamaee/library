const userControllers = require('../controllers/user');
const passport = require('passport');
const express = require('express');
const router = express();


passport.use('login', userControllers.passwordValid);
passport.deserializeUser(userControllers.valid);
passport.serializeUser(userControllers.valid);
passport.use('teste', userControllers.tokenValid);

router.post('/register', userControllers.new);

router.post('/login', userControllers.login);

router.get('/rota-protegida', passport.authenticate('teste', { session: false }), (req, res, next) => {
    res.json({ message: 'Autenticação bem-sucedida:' });
});



router.get('/rota-publica', (req, res) => {
    res.json({ message: 'Esta é uma rota pública.' });
});

module.exports = router;
