const Tasks = require('../models/tasks');

const dueDateChanger = (duedate) => {
    return duedate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

module.exports.taskList = async (req, res) => {
    // console.log(req.user);
    // res.json(res.user);
    // res.send("this is your task list page after login..");
    if (!req.isAuthenticated())
        return res.redirect('/');

    let fetchedTasks = await Tasks.find({ email: req.user.email });
    // console.log(fetchedTasks); 
    let finalData = [];
    fetchedTasks.forEach((task) => {
        // console.log(task);
        // finalData[task["_id"]] = task;
        let { id, email, description, category, duedate } = task;
        // console.log(id);
        duedate = dueDateChanger(duedate);
        finalData.push({ id, description, category, duedate });
    })
    // console.log(finalData);
    res.render('task_list', { email: req.user.email, finalData: finalData });
}

module.exports.createTask = async (req, res) => {
    // date = date ? new Date(date) : new Date();
    // console.log(req.body, req.user.email);
    let taskObj = new Tasks({
        email: req.user.email,
        description: req.body['description-input'],
        category: req.body['category-input'],
        duedate: req.body['duedate-input']
    });
    let taskData = "";
    try {
        taskData = await Tasks.create(taskObj);
        // console.log(taskData);
    } catch (err) {
        return res.json({ "error": err, "res": "Please Try Again" })
    }
    res.redirect('/profile-tasks');
}

module.exports.deleteTask = async (req, res) => {
    if (!req.isAuthenticated())
        return res.redirect('/');

    try {
        let idList = Array.isArray(req.body.task_id) ? req.body.task_id : [req.body.task_id];
        // console.log(idList);
        const deleted = await Tasks.deleteMany({ _id: { $in: idList } });
    } catch (err) {
        console.log(err);
    }
    res.redirect('/profile-tasks');
}