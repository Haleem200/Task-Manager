const AppError = require('../utils/AppError')

/*
const handleCastErrorDB = (err) => {
    const message = `invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);   
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400) 
}   

const handleDuplicateFields = (err) => {
    const duplicatedField = (err.message.split('{ ')[1].split(':')[0])
    const msg = `duplicated value for the field: ${duplicatedField}. try another value!`
    return new AppError(msg, 400)
}

const sendErrorProd = (err, res) => {
    //assigning statusCode and status for errors that don't have it (not made by AppError)
    err.statusCode = err.statusCode || 500 
    err.status = err.status || 'error'

    res.status(err.statusCode)
    res.json({
        status: err.status,
        message: err.message,
    })
}

const sendErrorDev = (err, res) => {
    console.log(err);
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}


module.exports = (err, req, res, next) => {
    if(err.name === 'CastError') err = handleCastErrorDB(err)
    if(err.name === 'ValidationError') err = handleValidationErrorDB(err)
    if(err.name === 'MongoServerError') err = handleDuplicateFields(err)
    sendErrorProd(err, res)
}

*/

const handleCastErrorDB = (err) => {
    const message = `invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map(el => el.message);   
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(message, 400) 
}   

const handleDuplicateFields = (err) => {
    const duplicatedField = (err.message.split('{ ')[1].split(':')[0])
    const msg = `duplicated value for the field: '${duplicatedField}'. try another value!`
    return new AppError(msg, 400)
}

const devError = (err, res) => {
    console.log(err);
    res.status(err.statusCode).json({
        error: err,
        status: err.status,
        message: err.message,
        stack: err.stack
    })
}

const prodError = (err, res)=> {
    if (err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }
    else{
        // 1) Log error
        console.error('ERROR 💥', err);
    
        // 2) Send generic message
        res.status(500).json({
          status: 'error',
          message: 'Something went very wrong!'
        });
      }
    };

module.exports = (err, req, res, next) => {
    
    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error' 

    if(err.name === 'ValidationError')  err = handleValidationErrorDB(err)
    if(err.name === 'CastError') err = handleCastErrorDB(err)
    if(err.code === 11000) err = handleDuplicateFields(err)

    if (process.env.NODE_ENV === 'development'){
        devError(err, res)
    }
    else{
        prodError(err, res)
    }
}


