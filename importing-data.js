const fs = require('fs')
const mongoose = require('mongoose')
const ToDo = require('./models/toDoModel')
const User = require('./models/userModel')

const db = process.env.DB

mongoose.connect(db).then(() => {
    console.log('DB in now connected!');
})


const toDoData = JSON.parse(fs.readFileSync('./toDos.json', {
    encoding: 'utf8'
}))

const userData = JSON.parse(fs.readFileSync('./users.json', {
    encoding: 'utf8'
}))

const importData = async () => {
    try{
        await ToDo.create(toDoData)
        await User.create(userData)
        console.log('Data loaded successfully!');
    }
    catch(err){
        console.log(err);
    }
    process.exit()
}

const deleteData = async () => {
    try{
        await ToDo.deleteMany()
        await User.deleteMany()
        console.log('Data deleted successfully!');
    }
    catch(err){
        console.log(err);
    }
    process.exit()
}
const flag = process.argv[2]
console.log(flag);
if (flag === '--import') 
    importData()
else if (flag === '--delete')  
    deleteData()
