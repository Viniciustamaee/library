const passport = require('passport');

const authenticateTeste = (req, res, next) => {
    passport.authenticate('teste', { session: false })(req, res, next);
};

module.exports = authenticateTeste;