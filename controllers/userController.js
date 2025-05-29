const AppError = require('../utils/AppError');
const User = require('./../models/userModel')
const catchAsync = require('./../utils/catchAsyncErrors')
const sendResponse = require('../utils/responseHandler');


exports.getAllUsers= catchAsync(async (req, res, next) => {
    const users = await User.find().select('username')
    if (users.length === 0) return next(new AppError('No users found!', 404))
    sendResponse(res, 200, users, 'Users retrieved successfully');
})

exports.updateMe = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if(!user) return next(new AppError('No user found with this id', 404))

    const updatedUser = await User.findOneAndUpdate({_id: req.user.id}, req.body,{
        runValidators: true,
        new: true
    })
    sendResponse(res, 200, { user: updatedUser }, 'User updated successfully');
})

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.deleteOne({_id: req.user.id})
    sendResponse(res, 204);
})


