const ToDo = require('../models/toDoModel')
const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsyncErrors')

const sendResponse = async (statusCode, data, res) => {
    let results
    res.status(statusCode).json({
        status: 'success',
        results,
        data:{
            data
        }
    })
}

exports.getAllToDos = catchAsync(async (req, res, next) => {
  
    const toDos = await ToDo.find({user: req.user._id})
    if(toDos.length === 0) return (next (new AppError("You don't have any toDos", 404)))

    res.status(200).json({
        status: 'success',
        data: {
            toDos
        }
    })

})

exports.updateToDo = catchAsync(async (req, res, next) => {

    const toDo = await ToDo.findOneAndUpdate({_id:req.params.id}, req.body, {
        runValidators: true,
        new: true
    }) 

    if(!toDo){
        return next(new AppError('No task found with that ID', 404));
    }


    sendResponse(200, toDo, res)
})

exports.deleteToDo = catchAsync(async (req, res, next) => {    
    const toDo = await ToDo.findOneAndDelete({_id: req.params.id})
    if(!toDo) {
        return next(new AppError("You don't have a toDo with this ID", 404))
    }

    res.status(204).json({
        status: 'success',
        data: null
    });
})

exports.getToDo = catchAsync(async (req,  res, next) => {
    const toDo = await ToDo.findById(req.params.id)
    if(!toDo) return (next (new AppError('No toDo found with this id', 404)))
    sendResponse(200, toDo, res) 
})

exports.createToDo = catchAsync(async (req, res, next) => {
    req.body.user = req.user.id
    const toDo = await ToDo.create(req.body) 
    sendResponse(200, toDo, res) 
})

exports.getUserToDos = catchAsync(async (req, res, next) => {
    const user = req.params.userId
    const toDos = await ToDo.find({user}) 
    sendResponse(200, toDos, res) 
})
