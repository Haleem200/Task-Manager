const AppError = require('../utils/AppError');
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsyncErrors')

const sendResponse = async (statusCode, data, res, msg) => {
    let results
    if (typeof data === 'object') results = data.length

    res.status(statusCode).json({
        status: 'success',
        results,
        message: msg,
        data:{
            data
        }
    })
}


//the following middleware sends the firstname of all registered users
exports.getAllUsers= catchAsync(async (req, res, next) => {
    const users = await User.find().select('firstname')
    if (users.length === 0) return next(new AppError('No users found!', 404))
    sendResponse(200, users, res)
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    console.log(req.user.id);
    await User.deleteOne({_id: req.user.id})
    console.log(user);
    sendResponse(204, null, res)
})


// this function does not expext any params. instade, the id is checked in the authorize middleware
exports.updateMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if(!user) return next(new AppError('No user found with this id', 404))

    const updatedUser = await User.findOneAndUpdate({_id: req.user.id}, req.body,{
        runValidators: true,
        new: true
    })
    sendResponse(200, updatedUser, res, 'user was edit successfully!')
})

/*
exports.getUserToDos = catchAsync(async (req, res, next) => {
    const user = req.user.id
    const toDos = await ToDo.find({ user })
    console.log(toDos);
})
*/