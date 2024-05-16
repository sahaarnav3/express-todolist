module.exports.home = (req, res) => {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated())
        return res.redirect('/profile-tasks');
    res.render('home');
}

module.exports.login = (req, res) => {
    res.redirect('/profile-tasks');
}