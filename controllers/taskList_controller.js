const Tasks = require('../models/tasks');


//This function is used to change the format of date after it is fetched from the database.
const dueDateChanger = (duedate) => {
    return duedate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}


//This conttroller is used to fetch all the tasks and pass it to the ejs file.
module.exports.taskList = async (req, res) => {

    if (!req.isAuthenticated())
        return res.redirect('/');

    let fetchedTasks = await Tasks.find({ email: req.user.email });
    let finalData = [];
    fetchedTasks.forEach((task) => {
        let { id, email, description, category, duedate } = task;
        duedate = dueDateChanger(duedate);
        finalData.push({ id, description, category, duedate });
    })
    // console.log(finalData);
    res.render('task_list', { email: req.user.email, finalData: finalData });
}

//This controller is used to actually create a task and persist is in the mongoDB collection. This works with the post request.
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

//This controller is used to delete single or multiple tasks together from the mongoDB collection. It works with a post request.
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