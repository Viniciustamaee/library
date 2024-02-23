const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const foundDueDate = require('../validation/dueDate')
const JwtStrategy = require('passport-jwt').Strategy;
const Users = require('../models/Users');
const secretKey = 'sua_chave_secreta';
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA',
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Users.existUser(jwt_payload.sub, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user);
        return done(null, false);
    });
}))

module.exports.new = async (req, res) => {
    const { email, username, password, img } = req.body

    if (!email || !username || !password || !img) {
        return res.status(406).json({ "erros": "Dados insuficientes" })
    }

    try {
        const existUser = await Users.existUser(username, email)
        if (existUser.length == 0) {
            await Users.newUser(email, username, password, img);
            return res.status(200).json({ "mensagem": "User inserido com sucesso!" });

        } else {
            return res.status(422).json({ "mensagem": "Já existe usuário com esse email ou usernmae" });

        }

    } catch (error) {
        return res.status(500).json({ "mensagem": "Erro interno do servidor" });

    }
};

module.exports.valid = function (user, done) {
    done(null, user);
}

module.exports.passwordValid = new LocalStrategy(async function (username, password, done) {
    try {
        const rows = await Users.login(username);

        if (rows.length === 0) {
            return done(null, false, { message: 'Usuário não encontrado.' });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
            return done(null, { userId: user.id, token: token });

        } else {
            return done(null, false, { message: 'Senha incorreta.' });
        }
    } catch (error) {
        return done(error);
    }
});

module.exports.login = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.status(401).json({ "mensagem": 'Usuário não encontrado ou senha incorreta.' });
            }

            const expiredBooks = await foundDueDate();

            const expiredBooksUser = expiredBooks.find(book => book.user_id === user);


            req.logIn(user, async (err) => {
                if (err) {
                    return next(err);
                }

                if (expiredBooksUser) {
                    return res.status(400).json({ "mensagem": 'Bem-vindo! Você tem livros para devolver hoje.' });
                }

                const profile = await Users.oneUser(user.userId);
                const token = await user.token
                return res.status(200).json({ profile, token });
            });

        } catch (error) {
            return next(error);
        }
    })(req, res, next);
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            console.error(err);
        }
        return res.status(400).json({ "mensagem": 'até logo' });
    });
}

