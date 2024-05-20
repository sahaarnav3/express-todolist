const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const signupUserController = require('../controllers/signup_user_controller');
const taskListController = require('../controllers/taskList_controller');
const passport = require('passport');

console.log('Router Loaded');

//Below router is used for loading the main login page which is also the home page of the app.
router.get('/', homeController.home);
router.post('/', passport.authenticate('local',{
    failureRedirect: '/',
    successRedirect: '/profile-tasks'
}));

//Basically working with 2 routers one for the user control i.e create id, login logouot etc and other for the task list control.
//Below router is used for session and user controlling, to create new user, log the user in and log the user out.
router.get('/create-user', signupUserController.createUser)
router.post('/create-user', signupUserController.createNewUser)
router.post('/logout', signupUserController.destroySession);

//Below routes is used for task list controlling, to show all task, to add new task and to delete task(s).
router.get('/profile-tasks', taskListController.taskList);
router.post('/create-task', taskListController.createTask);
router.post('/delete-task', taskListController.deleteTask);


module.exports = router;