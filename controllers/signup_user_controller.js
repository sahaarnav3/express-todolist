const User = require('../models/users');

module.exports.createUser = (req, res) => {
    if (req.isAuthenticated())
        return res.redirect('/profile-tasks');
    res.render('sign_up_user');
}

module.exports.createNewUser = async (req, res, done) => {

    const userObj = new User({
        email: req.body.email,
        password: req.body.password
    })
    if (req.body.password !== req.body['confirm-password']) {
        console.log("galat");
        // req.flash('info', "Galat Password Dalis");
        // done(null, false, {message: "Please ensure Password and Confirm-Password are same.."});
        return res.redirect('/create-user');
    }
    let userData = "";
    try {
        userData = await User.create(userObj)
    } catch (err) {
        console.log("This error occured in creating the user -- ", err);
        if (err.code == 11000) {
            // req.flash('error', "This user already exists..");
            // return done(null, false, {message: "This user already exists.."});
            return res.json({ "Error": "This User Already Exists, Try with another Email" });
        }
        return res.redirect('/create-user');
    }
    // console.log(userData);
    res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error Logging Out.");
        }
        res.redirect('/');

    });
}