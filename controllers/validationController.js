const { body, validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        return next(new AppError(`Validation failed: ${errorMessages.join(', ')}`, 400));
    }
    next();
};

exports.validateToDo = [
    body('title')
        .isLength({ min: 4, max: 30 })
        .withMessage('Title must be between 4 and 30 characters')
        .trim(),
    body('status')
        .optional()
        .isIn(['to-do', 'in-progress', 'done'])
        .withMessage('Status must be: to-do, in-progress, or done'),
    handleValidationErrors
];

exports.validateUser = [
    body('username')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be between 3 and 20 characters')
        .trim(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters'),
    body('passwordConfirm')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation does not match password');
            }
            return true;
        }),
    handleValidationErrors
];