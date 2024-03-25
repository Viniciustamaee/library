const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Users = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const scretKey = process.env.SECRET_KEY

module.exports.valid = function (user, done) {
    done(null, user);
}

module.exports.allUsers = async (req, res) => {
    try {
        const allUsers = await Users.allUsers();
        return res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Internal server error" });
    }
}


module.exports.oneUser = async (req, res) => {
    const { id } = req.params
    try {
        const oneUser = await Users.oneUser(id);
        return res.status(200).json(oneUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "mensagem": "Internal server error" });
    }
}



module.exports.new = async (req, res) => {
    const { email, username, password, description } = req.body

    let img;



    if (req.file && req.file.path) {
        img = req.file.path;
    } else {
        img = process.env.DEFAULT_USER;
    }

    if (!email || !username || !password) {
        return res.status(406).json({ "erros": "Insufficient data" })
    }

    try {
        const existUser = await Users.existUser(username, email)
        if (existUser.length > 0) {
            return res.status(422).json({ "mensagem": "There is already a user with this email and username" });
        }

        await Users.newUser(email, username, password, img, description);
        return res.status(200).json({ "mensagem": "User insert with success" });

    } catch (error) {
        return res.status(500).json({ "mensagem": "Internal server error" });
    }
};

module.exports.update = async (req, res) => {
    const { email, username, password, description } = req.body
    const { id } = req.params
    let img;

    if (!email || !username || !password || !description) {
        return res.status(406).json({ "erros": "Insufficient data" })
    }

    try {
        const existUser = await Users.existUser(username, email)
        if (existUser.length > 0) {
            return res.status(422).json({ "mensagem": "There is already a user with this email and username" });
        }


        if (req.file && req.file.path) {
            img = req.file.path;
        } else {
            const imgUser = await Users.img(email)
            img = imgUser[0].img;
            await Users.update(email, username, password, img, description, id);
            return res.status(200).json({ "mensagem": "User edit with success!" });
        }




    } catch (error) {
        console.log(error)
        return res.status(500).json({ "mensagem": "Internal server error" });

    }
};

module.exports.passwordValid = new LocalStrategy(function (username, password, done) {
    Users.login(username)
        .then(rows => {
            if (rows.length === 0) {
                return done(null, false, { message: 'User does not find.' });
            }

            const user = rows[0];

            bcrypt.compare(password, user.password)
                .then(passwordMatch => {
                    if (passwordMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Wrong Passwrod.' });
                    }
                })
                .catch(error => done(error));
        })
        .catch(error => done(error));
});

module.exports.login = ('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');

                return next(error);
            }

            req.login(
                user,
                { session: false },
                async (error) => {
                    if (error) return next(error);
                    const dateUser = await Users.oneUser(user.id)
                    const body = { id: user.id, username: user.username };
                    const token = jwt.sign({ user: body }, scretKey, { expiresIn: 3600 });

                    return res.json({ dateUser, token });
                }
            );
        } catch (error) {
            return next(error);
        }
    }
    )(req, res, next);
}
);

module.exports.tokenValid = new JWTstrategy(
    {
        secretOrKey: scretKey,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null, token);
        } catch (error) {
            console.error('Erro in validation token:', error);
            return done(error);
        }
    }
);
