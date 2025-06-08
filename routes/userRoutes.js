const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const { validateUser } = require('../controllers/validationController');

const router = express.Router()


router
    .route('/')
    .get(authController.authorize, userController.getAllUsers)
    .delete(authController.authorize, userController.deleteMe)
    .patch(authController.authorize, validateUser, userController.updateMe) 

router
    .route('/register')
    .post(validateUser, authController.signUp)

router
    .route('/login')
    .post(authController.signIn)

router
    .route('/logout')
    .post(authController.logout)

module.exports = router