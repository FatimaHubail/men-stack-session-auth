const User = require('../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const signup = async (req, res) => {
    res.render('auth/sign-up.ejs');
};

const register = async (req, res) => {
    try {
        // verify if the username already exists
        const userInDb = await User.findOne({ username: req.body.username });
        if (userInDb) {
            return res.send("Invalid input");
        }

        // verify password
        if (req.body.password !== req.body.confirmPassword) {
            return res.send("Invalid input")
        }

        // enyc the password
        const hashedPass = bcrypt.hashSync(req.body.password, SALT_ROUNDS);
        req.body.password = hashedPass;

        //create user
        const user = await User.create(req.body);
    } catch (error) {
        console.log(error);
        res.send('something wen wrong');
    }
}

const signin = async (req, res) => {
    res.render('auth/sign-in.ejs');
};

const login = async (req, res) => {
    const userInDb = await User.findOne({ username: req.body.user });

    // allow only users that exist to login
    if (!userInDb) {
       return res.send('Invalid cresentials');
    }

    // verify password
    if (!bcrypt.compareSync(req.body.password, userInDb.password)) {
        return res.send('Invalid cresentials');
    }
}


module.exports = {
    signup,
    register,
    signin,
};