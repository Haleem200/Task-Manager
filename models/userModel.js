const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'please provide a username!'],
        unique: true
    },
    firstname: {
        type: String,
        required: [true, 'your must provide your firstname!'],
        minlength: 3,
        maxLength: 15
    },
    age: {
        type: Number,
        min: [13, 'sorry, people under 13 are not allowed to register!']
    },
    password: {
        type: String,
        minlength: 8,
        select: false,
        required: [true, 'please provide a password']
    },
    passwordConfirm: {
        type: String,
        required: [true, 'you must confirm your password'],
        validate: {
            validator: function(confirm){
                return confirm = this.password
            },
            message: 'password and passordConfirm do not match'
        }
    }
})

// Reminder: pre save hooks only works for SAVE and CREATE methods (not with UPDATE)
userSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 12)
    this.passwordConfirm = undefined
    next()
})

userSchema.methods.isPasswordCorrect = async function (candidateaPass, storedHashedPass){
    return await bcrypt.compare(candidateaPass, storedHashedPass)
}

userSchema.virtual('toDos',{
    ref: 'Todo',
    foreignField: 'user',
    localField: '_id'
})

const User = mongoose.model('User', userSchema)
module.exports = User


