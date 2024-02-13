const LocalStrategy = require('passport-local').Strategy;
const Users = require('../models/Users');
const passport = require('passport');
const bcrypt = require('bcrypt');


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
            return done(null, user.id);

        } else {
            return done(null, false, { message: 'Senha incorreta.' });
        }
    } catch (error) {
        return done(error);
    }
});

module.exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log(info);
            return res.status(422).json({ "mensagem": 'Usuário não encontrado ou senha incorreta.' });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            return res.status(400).json({ "mensagem": 'Bem-vindo' });
        });
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

