const express = require('express')
const toDoController = require('../controllers/toDoController')
const authController = require('../controllers/authController')
const router = express.Router()
    
router
    .route('/')
    .get(authController.authorize, toDoController.getAllToDos)
    .post(authController.authorize, toDoController.createToDo)

router
    .route('/:id')
    .patch(authController.authorize, toDoController.updateToDo) 
    .delete(authController.authorize, toDoController.deleteToDo)

module.exports = router