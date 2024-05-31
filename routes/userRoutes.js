const express = require('express')
const userController = require('./../controllers/userController')
const authController = require('./../controllers/authController')
const router = express.Router()


//router('/userId')

router
    .route('/')
    //.get(authController.authorize, userController.getAllUsers)
    .delete(authController.authorize, userController.deleteMe)
    .patch(authController.authorize, userController.updateMe) 

router
    .route('/register')
    .post(authController.signUp)

router
    .route('/login')
    .post(authController.signIn)


module.exports = router