const express = require('express')
const toDoController = require('../controllers/toDoController')
const authController = require('../controllers/authController')
const { validateToDo } = require('../controllers/validationController');
const router = express.Router()
    
router
    .route('/')
    .get(authController.authorize, toDoController.getAllToDos)
    .post(authController.authorize, validateToDo, toDoController.createToDo)

router
    .route('/:id')
    .patch(authController.authorize, validateToDo, toDoController.updateToDo) 
    .delete(authController.authorize, toDoController.deleteToDo)

module.exports = router