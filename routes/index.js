const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const signupUserController = require('../controllers/signup_user_controller');
const taskListController = require('../controllers/taskList_controller');
const passport = require('passport');

console.log('Router Loaded');


router.get('/', homeController.home);
// router.post('/', homeController.login);
router.post('/', passport.authenticate('local',{
    failureRedirect: '/',
    successRedirect: '/profile-tasks'
}));

router.get('/create-user', signupUserController.createUser)
router.post('/create-user', signupUserController.createNewUser)
router.get('/profile-tasks', taskListController.taskList);
router.post('/create-task', taskListController.createTask);
router.post('/delete-task', taskListController.deleteTask);

router.post('/logout', signupUserController.destroySession);

module.exports = router;