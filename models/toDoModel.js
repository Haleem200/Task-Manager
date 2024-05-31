const mongoose = require('mongoose')


const toDoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'A to-do item must has a title!'],
        minLength: [4, 'title can not be less than 5 characters!'],
        maxLength: [30, 'title must not exeed 20 character']
    },
    status: {
        required: true,
        type: String,
        default: 'to-do'
    },
    tags:{
        type: [{
            type: String,
            maxLength: [10, 'tags must not exeed 10 characters!']
        }]
    },
}, {timestamps: true}) 

toDoSchema.index({ title: 1 })


const ToDo = mongoose.model('ToDo', toDoSchema)
module.exports = ToDo
