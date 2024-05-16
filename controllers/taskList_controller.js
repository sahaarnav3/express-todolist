const Tasks = require('../models/tasks');

module.exports.taskList = (req, res) => {
    // console.log(req.user);
    // res.json(res.user);
    // res.send("this is your task list page after login..");
    if(!req.isAuthenticated())
        res.redirect('/');
    res.render('task_list', {email: req.user.email});
}

module.exports.createTask = (req, res) => {
    // date = date ? new Date(date) : new Date();
    console.log(req.body);
    res.redirect('/profile-tasks');
}