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


exports.updateMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if(!user) return next(new AppError('No user found with this id', 404))

    const updatedUser = await User.findOneAndUpdate({_id: req.user.id}, req.body,{
        runValidators: true,
        new: true
    })
    sendResponse(200, updatedUser, res, 'user was edit successfully!')
})
