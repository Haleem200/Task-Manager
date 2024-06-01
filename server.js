const mongoose = require('mongoose')
require('dotenv').config()

const app = require('./app')

console.log(process.env.NODE_ENV);

const db = process.env.DB
mongoose.connect(db).then(() => {
    console.log('DB is now connected!');
})

const port = process.env.PORT;
const server = app.listen(port || 3000, () => {
  console.log(`server is working on port ${port}`);
  //console.log(process.env.NODE_ENV);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});