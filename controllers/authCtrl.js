const User = require('../models/user');

const signup = async (req, res) => {
    res.render('auth/sign-up.ejs');
};

module.exports = {
    signup,
};