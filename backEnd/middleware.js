module.exports.isLoggin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(403).json({ error: 'User is not connected.' });
    }
    res.locals.user = req.user;
    next();
}