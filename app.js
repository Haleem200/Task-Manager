const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const toDoRouter = require('./routes/toDoRoutes')
const userRouter = require('./routes/userRoutes')
const globalErrorHandler = require('./controllers/errorController')
const path = require('path')
const compression = require('compression')
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express()

const allowedOrigins = ['https://task-manager-nlnr.onrender.com', 'http://localhost:5000', 'http://13.49.224.93'];
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


app.use(express.static(path.join(__dirname, 'public')));

if(app.get('env') === 'development')
    app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

app.use(express.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(compression())


app.use(helmet()); 

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/users', authLimiter); 

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200, 
    message: 'Too many API requests from this IP, please try again later.'
});
app.use('/toDos', apiLimiter);


app.use('/toDos', toDoRouter)
app.use('/users', userRouter)

app.use(globalErrorHandler)

module.exports = app


