
//below controller is used for rendering the home page, if a user is already logged in and a session exists then it will-
//-redirect to the task list page of the logged in user.
module.exports.home = (req, res) => {
    if(req.isAuthenticated())
        return res.redirect('/profile-tasks');
    res.render('home');
}

module.exports.login = (req, res) => {
    res.redirect('/profile-tasks');
}