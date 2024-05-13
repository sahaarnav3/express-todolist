module.exports.createUser = (req, res) => {
    res.render('sign_up_user');
}

module.exports.createNewUser = (req, res) => {
    console.log(req.body);
    res.send('banao naya');
}