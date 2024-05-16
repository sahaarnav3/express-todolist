const Tasks = require('../models/tasks');

module.exports.taskList = (req, res) => {
    // console.log(req.user);
    // res.json(res.user);
    // res.send("this is your task list page after login..");
    if(!req.isAuthenticated())
        res.redirect('/');
    
    res.render('task_list', {email: req.user.email});
}

module.exports.createTask = async (req, res) => {
    // date = date ? new Date(date) : new Date();
    console.log(req.body, req.user.email);
    let taskObj = new Tasks({
        email: req.user.email,
        description: req.body['description-input'],
        category: req.body['category-input'],
        duedate: req.body['duedate-input']
    });
    let taskData = "";
    try {
        taskData = await Tasks.create(taskObj);
        console.log(taskData);
    } catch (err) {
        return res.json({"error": err, "res": "Please Try Again"})
    }
    res.redirect('/profile-tasks');
}

module.exports.deleteTask = (req, res) => {
    res.json(req.body);
}