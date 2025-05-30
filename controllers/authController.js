const jwt = require('jsonwebtoken')
const catchAsync = require('./../utils/catchAsyncErrors')
const User = require('./../models/userModel')
const AppError = require('../utils/AppError')
const sendResponse = require('../utils/responseHandler');

const privateKey = process.env.JWT_SECRET


const createSendToken = async (user, status, res, msg) => {

    const userResponse = {
    id: user._id,
    username: user.username,
    };

  const token = jwt.sign({ id: user._id }, privateKey, {
    expiresIn: "60 days"
  });

  sendResponse(res, status, {
    data: {
      user: userResponse,
      token: token
    },
    message: msg
  });
};
exports.signUp = catchAsync(async (req, res, next) => {

    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    })
    createSendToken(newUser, 201, res, 'user was registered successfully!')
})



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

exports.authorize = catchAsync(async (req, res, next) => {
    if (!req.headers.authorization) return (next(new AppError('you are not logged in, please login first!', 401)))

    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, privateKey, async function(err, decoded) {
    if(err) {
        console.log(err)
        if(err.name === 'TokenExpiredError') {
            return next(new AppError('Your token has expired, please login again', 401))
        }
        return next(new AppError('You are not allowed to perform this action', 401));
    }
        try{
            const user = await User.findById(decoded.id) 
            if(!user) return (next(new AppError('The user belonging to this token is no longer exists', 401)))
            req.user = user
            next()
        }catch(err){
            next(err)
        }
    });
})

