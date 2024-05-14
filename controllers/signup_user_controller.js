const User = require('../models/users');

module.exports.createUser = (req, res) => {
    res.render('sign_up_user');
}

module.exports.createNewUser = async (req, res) => {
    console.log(req.body);
    const userObj = new User({
        email: req.body.email,
        password: req.body.password
    })
    if(req.body.password !== req.body['confirm-password']){
        console.log("galat");
        req.flash('info', "Galat Password Dalis");
        return res.redirect('/create-user');
    }
    const data = await User.create(userObj)
    console.log(data);
    res.send('banao naya');
}