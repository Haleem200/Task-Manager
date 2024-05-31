const mongoose = require('mongoose')
/*
user: the ObjectId of the user,  (33333#)
title: String, required, min 5, max 20, indexed
status: String, optional, default is “to-do”
tags:[String], optional, max length for each tag is 10
createdAt: timeStamp,
updatedAt: timeStamp
*/

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
}, {timestamps: true}) // Add timestamps (createdAt, updatedAt) to the schema

toDoSchema.index({ title: 1 })

/*
toDoSchema.pre(/^find/, function(next){
    this.populate('user')
    next()
})
*/

const ToDo = mongoose.model('ToDo', toDoSchema)
module.exports = ToDo
