const ToDo = require('../models/toDoModel')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsyncErrors')
const sendResponse = require('../utils/responseHandler');

exports.getAllToDos = catchAsync(async (req, res, next) => {
  
    const toDos = await ToDo.find({user: req.user._id})

    sendResponse(res, 200,  {toDos}, 'Tasks retrieved successfully');
})

exports.updateToDo = catchAsync(async (req, res, next) => {

    const toDo = await ToDo.findOneAndUpdate({
        _id: req.params.id, 
        user: req.user._id 
    },
    req.body,
    {
        runValidators: true,
        new: true
    }) 

    if(!toDo){
        return next(new AppError('No task found with that ID', 404));
    }

    sendResponse(res, 200, toDo, 'Task updated successfully');
})

exports.deleteToDo = catchAsync(async (req, res, next) => {    
    const toDo = await ToDo.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id  
    })
    if(!toDo) {
        return next(new AppError("You don't have a toDo with this ID", 404))
    }

    sendResponse(res, 204);
})

exports.createToDo = catchAsync(async (req, res, next) => {
    req.body.user = req.user.id
    const toDo = await ToDo.create(req.body) 
    sendResponse(res, 201, toDo, 'Task created successfully');
})
