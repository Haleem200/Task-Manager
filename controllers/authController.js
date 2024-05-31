const jwt = require('jsonwebtoken')
const catchAsync = require('./../utils/catchAsyncErrors')
const User = require('./../models/userModel')
const AppError = require('../utils/AppError')

const privateKey = process.env.JWT_SECRET


const createSendToken = async (user, status, res, msg) => {
    user.password = undefined;

    const token = jwt.sign({ id: user._id }, privateKey, {
        expiresIn: "60 days"
    })
    res.status(status).json({
        status:'success',
        message: msg, 
        token,
        data: {
            token,
            user
        }
    })
}

exports.signUp = catchAsync(async (req, res, next) => {
    console.log('entered');
    console.log(req.body.username);


    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newUser, 201, res, 'user was registered successfully!')
})


//the signin function still needs improvements:
//it must send all the toDos of the logged in user with the response

exports.signIn = catchAsync(async (req, res, next) => {

    const {username, password} = req.body
    if(!username || !password) return next(new AppError('please provide your username and password', 400))

    const user = await User.findOne({
        username: req.body.username
    }).select('+password')

    if (!user || !await user.isPasswordCorrect(req.body.password, user.password)) return next(new AppError(
        'invlid credentials',
        401
    ))

    createSendToken(user, 200, res, 'logged in successfully!')
})

// checking if the user is logged in and adds the user to the req in req.user field to be used in the following middlewares
exports.authorize = catchAsync(async (req, res, next) => {
    if (!req.headers.authorization) return (next(new AppError('you are not logged in, please login first!', 401)))

    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, privateKey, async function(err, decoded) {
        if(err) return (next (('You are not allowed to perform tis action', 401)))

        try{
            //console.log(decoded.id);
            const user = await User.findById(decoded.id) 
            if(!user) return (next(new AppError('The user belonging to this token is no longer exists', 401)))
            req.user = user
            next()
        }catch(err){
            next(err)
        }
    });
})

