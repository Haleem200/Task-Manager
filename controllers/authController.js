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

    // Set cookie options
    const cookieOptions = {
        expires: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        httpOnly: true,
        secure: true, 
        sameSite: 'none', 
        domain: process.env.NODE_ENV === 'production' ? '.task-manager.me' : 'localhost'
    };

    // Set JWT as HttpOnly cookie
    res.cookie('jwt', token, cookieOptions);

    sendResponse(res, status, {
        data: {
            user: userResponse
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
    let token;
    
    // Get token from cookie
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new AppError('You are not logged in. Please log in to get access.', 401));
    }

    // Verify token
    jwt.verify(token, privateKey, async function(err, decoded) {
        if(err) {
            console.log(err);
            if(err.name === 'TokenExpiredError') {
                return next(new AppError('Your token has expired, please login again', 401));
            }
            return next(new AppError('You are not allowed to perform this action', 401));
        }
        try {
            const user = await User.findById(decoded.id);
            if(!user) return next(new AppError('The user belonging to this token is no longer exists', 401));
            req.user = user;
            next();
        } catch(err) {
            next(err);
        }
    });
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true
    });
    sendResponse(res, 200, null, 'Logged out successfully');
};

