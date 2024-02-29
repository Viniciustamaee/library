const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Users = require('../models/Users');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const scretKey = 'teste' //Aqui vai ficar .env

module.exports.valid = function (user, done) {
    done(null, user);
}

module.exports.new = async (req, res) => {
    const { email, username, password, img, description } = req.body

    if (!email || !username || !password || !img || !description) {
        return res.status(406).json({ "erros": "Dados insuficientes" })
    }

    try {
        const existUser = await Users.existUser(username, email)
        if (existUser.length == 0) {
            await Users.newUser(email, username, password, img, description);
            return res.status(200).json({ "mensagem": "User inserido com sucesso!" });

        } else {
            return res.status(422).json({ "mensagem": "Já existe usuário com esse email ou usernmae" });

        }

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });

    }
};

module.exports.passwordValid = new LocalStrategy(function (username, password, done) {
    Users.login(username)
        .then(rows => {
            if (rows.length === 0) {
                return done(null, false, { message: 'Usuário não encontrado.' });
            }

            const user = rows[0];

            bcrypt.compare(password, user.password)
                .then(passwordMatch => {
                    if (passwordMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Senha incorreta.' });
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
        console.log('Estratégia tokenValid chamada. Token:', token);
        try {
            return done(null, token);
        } catch (error) {
            console.error('Erro na validação do token:', error);
            return done(error);
        }
    }
);
