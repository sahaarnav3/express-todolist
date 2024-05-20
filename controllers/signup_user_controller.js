const User = require('../models/users');


//below controller is used to show the create new user page. If a session already exists it will redirect to the task list page.
module.exports.createUser = (req, res) => {
    if (req.isAuthenticated())
        return res.redirect('/profile-tasks');
    res.render('sign_up_user');
}

//Below controller is used to actually create a new user and register it in our mongoDB this will be executed when POST request is hit.
module.exports.createNewUser = async (req, res, done) => {

    const userObj = new User({
        email: req.body.email,
        password: req.body.password
    })
    if (req.body.password !== req.body['confirm-password']) {
        // console.log("Wrong Password");
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


//This controller is used for logging the user out. Again this too works with the POST method.
module.exports.destroySession = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error Logging Out.");
        }
        res.redirect('/');

    });
}