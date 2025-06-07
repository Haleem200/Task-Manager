const express = require('express')
const morgan = require('morgan')
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
    origin: allowedOrigins,
    credentials: true
}));

// Parse cookies
app.use(cookieParser());

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


