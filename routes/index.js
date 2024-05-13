const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const signupUserController = require('../controllers/signup_user_controller');
const taskListController = require('../controllers/taskList_controller');

console.log('Router Loaded');

router.get('/', homeController.home);
router.get('/create-user', signupUserController.createUser)
router.post('/create-user', signupUserController.createNewUser)
router.get('/tasklist', taskListController.taskList);

module.exports = router;